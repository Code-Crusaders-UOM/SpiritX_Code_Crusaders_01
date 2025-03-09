const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Add JWT library

const app = express();
const PORT = 5001;
const JWT_SECRET = 'your_jwt_secret_key'; // Use a strong secret key in production (env variable)

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'DNw@2002', // Use environment variables for credentials in production
    database: 'user_auth_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
    
    // Create users table if it doesn't exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    
    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table ready');
        }
    });
});

// Backend validation function
function validateSignup(username, password, confirmpw) {
    let errors = {};
    
    // Username Validation
    if (!username?.trim()) {
        errors.username = "Username should not be empty";
    } else if (username.length < 8) {
        errors.username = "Username must be at least 8 characters long";
    }
    
    // Password Validation
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    
    if (!password?.trim()) {
        errors.password = "Password should not be empty";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    } else {
        let missingReqs = [];
        if (!hasLowercase) missingReqs.push("lowercase letter");
        if (!hasUppercase) missingReqs.push("uppercase letter");
        if (!hasSpecialChar) missingReqs.push("special character");
        
        if (missingReqs.length > 0) {
            errors.password = `Password must contain: ${missingReqs.join(", ")}`;
        }
    }
    
    // Confirm Password Validation
    if (confirmpw !== undefined) {
        if (!confirmpw?.trim()) {
            errors.confirmpw = "Confirm Password should not be empty";
        } else if (confirmpw !== password) {
            errors.confirmpw = "Passwords do not match";
        }
    }
    
    return errors;
}

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({
            status: 'error',
            message: 'Access denied. No token provided.'
        });
    }

    const token = authHeader.split(' ')[1]; // "Bearer TOKEN"
    
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }
};

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { username, password, confirmpw } = req.body;
        
        // Validate input
        const validationErrors = validateSignup(username, password, confirmpw);
        
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({
                status: 'error',
                message: Object.values(validationErrors)[0],
                errors: validationErrors
            });
        }
        
        // Check if username already exists
        const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
        db.query(checkUserQuery, [username], async (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    status: 'error',
                    message: 'Database error occurred'
                });
            }
            
            if (result.length > 0) {
                return res.status(409).json({
                    status: 'error',
                    message: 'Username already exists'
                });
            }
            
            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            // Insert new user
            const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query(insertUserQuery, [username, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({
                        status: 'error',
                        message: 'Failed to create account'
                    });
                }
                
                return res.status(201).json({
                    status: 'success',
                    message: 'User registered successfully'
                });
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during signup'
        });
    }
});

// Login Route with JWT
app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validate input
        const validationErrors = validateSignup(username, password);
        
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({
                status: 'error',
                message: Object.values(validationErrors)[0],
                errors: validationErrors
            });
        }
        
        // Find user by username
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    status: 'error',
                    message: 'Database error occurred'
                });
            }
            
            // No user found with that username
            if (results.length === 0) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid username or password'
                });
            }
            
            const user = results[0];
            
            // Compare provided password with stored hash
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (!passwordMatch) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid username or password'
                });
            }
            
            // Create and sign JWT token
            const token = jwt.sign(
                { id: user.id, username: user.username },
                JWT_SECRET,
                { expiresIn: '1h' } // Token expires in 1 hour
            );
            
            // Return the token
            return res.status(200).json({
                status: 'success',
                message: 'Login successful',
                token: token,
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during login'
        });
    }
});

// Protected route that requires authentication
app.get('', verifyToken, (req, res) => {
    res.json({
        status: 'success',
        message: 'Protected data retrieved successfully',
        user: req.user
    });
});

// Verify token endpoint
app.post('/verify-token', verifyToken, (req, res) => {
    res.json({
        status: 'success',
        message: 'Token is valid',
        user: req.user
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});