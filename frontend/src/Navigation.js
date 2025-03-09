import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setUsername(user.username);
        }
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/home">
                    <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
                        SC
                    </div>
                    SecureConnect
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="">Settings</Link>
                        </li>
                    </ul>
                    
                    <div className="d-flex align-items-center">
                        <span className="text-white me-3">Hello, {username}</span>
                        <button 
                            className="btn btn-outline-light" 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;