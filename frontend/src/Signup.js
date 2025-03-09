import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupValidation from './SignupValidation';
import axios from 'axios';

function Signup({ onLoginClick }) {
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmpw: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Password Strength Calculation
    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return Math.min(4, Math.floor(strength * 0.8));
    };

    const getPasswordStrengthColor = (strength) => {
        const colors = ['bg-danger', 'bg-warning', 'bg-info', 'bg-primary', 'bg-success'];
        return colors[strength];
    };

    const getPasswordStrengthText = (strength) => {
        const texts = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
        return texts[strength];
    };

    const [passwordStrength, setPasswordStrength] = useState(0);

    // Real-time validation
    useEffect(() => {
        if (values.username || values.password || values.confirmpw) {
            const validationErrors = SignupValidation(values);
            setErrors(validationErrors);
        }

        if (values.password) {
            const strength = calculatePasswordStrength(values.password);
            setPasswordStrength(strength);
        }
    }, [values]);

    // Handle Input Change
    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setAuthError(''); // Clear auth error when user types
    };

    // Handle Form Submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = SignupValidation(values);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            
            try {
                await axios.post('http://localhost:5001/signup', {
                    username: values.username,
                    password: values.password
                });

                setSuccessMessage("Account created successfully!");
                setShowConfirmation(true);
                setValues({ username: '', password: '', confirmpw: '' });
                
                // Switch to login modal after 2 seconds
                setTimeout(() => {
                    if (onLoginClick) {
                        onLoginClick(); // This will close signup modal and open login modal
                    } else {
                        // Fallback to navigate if not in modal context
                        navigate('/login');
                    }
                }, 2000);
            } catch (error) {
                setAuthError(error.response?.data?.message || "Signup failed. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Handle "Already have an account" click
    const handleLoginLinkClick = (e) => {
        e.preventDefault();
        if (onLoginClick) {
            onLoginClick(); // This will close signup modal and open login modal
        }
    };

    return (
        <div className="bg-light rounded p-4">
            <h2 className="text-center mb-4">Sign Up</h2>

            {/* Success Confirmation */}
            {showConfirmation && (
                <div className="alert alert-success text-center" role="alert">
                    {successMessage} <br />
                    Redirecting to login...
                </div>
            )}

            {/* Authentication Errors */}
            {authError && (
                <div className="alert alert-danger text-center" role="alert">
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
                    {errors.username && <span className="text-danger">{errors.username}</span>}
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
                    {errors.password && <span className="text-danger">{errors.password}</span>}

                    {/* Password Strength Bar */}
                    {values.password && (
                        <div className={`progress mt-2`}>
                            <div 
                                className={`progress-bar ${getPasswordStrengthColor(passwordStrength)}`} 
                                role="progressbar" 
                                style={{ width: `${(passwordStrength + 1) * 20}%` }} 
                                aria-valuenow={passwordStrength} 
                                aria-valuemin="0" 
                                aria-valuemax="4"
                            ></div>
                        </div>
                    )}
                    {values.password && (
                        <small className="d-block text-center mt-1">
                            Strength: {getPasswordStrengthText(passwordStrength)}
                        </small>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className='mb-3'>
                    <label htmlFor="confirmpw">Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirmpw" 
                        id="confirmpw" 
                        className='form-control rounded-0'
                        value={values.confirmpw} 
                        onChange={handleInput} 
                    />
                    {errors.confirmpw && <span className="text-danger">{errors.confirmpw}</span>}
                </div>

                {/* Submit Button */}
                <button 
                    type='submit' 
                    className='btn btn-success w-100'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p className="mt-2 text-center">By signing up, you agree to our terms and policies.</p>

                {/* Link to Login - Button that calls onLoginClick */}
                <button 
                    type="button" 
                    className='btn btn-default border w-100 bg-light text-decoration-none'
                    onClick={handleLoginLinkClick}
                >
                    Already have an account? Log In
                </button>
            </form>
        </div>
    );
}

export default Signup;