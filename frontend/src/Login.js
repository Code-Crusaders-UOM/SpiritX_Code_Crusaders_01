import React, { useState, useEffect } from 'react';
import validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onSignupClick }) {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Real-time validation
    useEffect(() => {
        if (values.username || values.password) {
            setErrors(validation(values));
        }
    }, [values]);

    // Handle input change
    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        setAuthError(''); // Clear auth error when user types
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);

        // Only proceed if there are no validation errors
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            try {
                const response = await axios.post('http://localhost:5001/login', values);

                if (response.data.status === "success") {
                    const userId = response.data.user.id;
                    
                    // Store token in localStorage
                    localStorage.setItem('token', response.data.token);
                    
                    // Store user info
                    localStorage.setItem('user', JSON.stringify({
                        id: userId,
                        username: response.data.user.username,
                        isLoggedIn: true
                    }));

                    // Redirect to profile with user ID in URL
                    navigate(`/profile/${userId}`);
                } else {
                    setAuthError("Invalid username or password");
                }
            } catch (error) {
                console.error("Login Error:", error);
                setAuthError(error.response?.data?.message || "Authentication failed. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className='bg-light p-5 rounded'>
            <h2 className="text-center mb-4">Log In</h2>

            {authError && (
                <div className="alert alert-danger" role="alert">
                    {authError}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className='mb-3'>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className='form-control rounded-0'
                        value={values.username}
                        onChange={handleInput}
                    />
                    {errors.username && <small className="text-danger">{errors.username}</small>}
                </div>

                {/* Password Field */}
                <div className='mb-3'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className='form-control rounded-0'
                        value={values.password}
                        onChange={handleInput}
                    />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='btn btn-success w-100'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                <p className="mt-2">By logging in, you agree to our terms and policies.</p>

                {/* Create Account Button - Opens Signup Modal */}
                <button
                    type="button"
                    className='btn btn-default border w-100 bg-light text-decoration-none'
                    onClick={onSignupClick}
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default Login;