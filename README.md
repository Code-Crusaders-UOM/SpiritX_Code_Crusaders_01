
 # SecureConnect - Authentication System

SecureConnect is a secure user authentication system with a React frontend and Express.js backend.

## Project Overview

This project implements a complete authentication system with:
- User registration with validation
- Secure login with JWT authentication
- Protected routes
- Password hashing with bcrypt
- MySQL database integration
- Responsive design with Bootstrap

## Prerequisites

- Node.js (v14+)
- MySQL Server
- npm

## Project Structure
```

## Setup Instructions

### Database Setup

1. Install MySQL if not already installed
2. Create a new database:
   ```sql
   CREATE DATABASE user_auth_db;
   ```

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your database connection in `server.js`:
   ```javascript
   const db = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'DNw@2002',
       database: 'user_auth_db'
   });
   ```

4. Start the backend server:
   ```
   npm start
   ```

   The server will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

   The application will run on `http://localhost:3000`

## Backend API Endpoints

| Endpoint         | Method | Description                            | Request Body                                         | Response                                            |
|------------------|--------|----------------------------------------|------------------------------------------------------|-----------------------------------------------------|
| `/signup`        | POST   | Register a new user                    | `{username, password, confirmpw}`                     | Success/Error message                               |
| `/login`         | POST   | Authenticate a user                    | `{username, password}`                                | JWT token, user info                                |
| `/verify-token`  | POST   | Verify JWT token validity              | JWT token in Authorization header                     | Success/Error message                               |
| `/protected-data`| GET    | Access protected route example         | JWT token in Authorization header                     | Protected data                                      |

## Authentication Flow

1. User registers via the signup form
2. Password is hashed before storage
3. User logs in with credentials
4. Backend validates credentials and issues a JWT token
5. Frontend stores the token
6. Token is included in headers for protected API calls

## Security Features

- Password hashing with bcrypt
- Password validation with requirements:
  - Minimum 8 characters
  - At least one lowercase letter
  - At least one uppercase letter
  - At least one special character
- JWT token-based authentication
- Input validation on both frontend and backend

## Development Notes

- The JWT token expires after 1 hour by default
- Backend validation mirrors frontend validation for security
- Bootstrap is used for responsive design

