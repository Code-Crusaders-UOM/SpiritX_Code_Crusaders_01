// import React, { useState } from 'react';
// import landingBg from './assets/images/Landingbg.jpg';
// import Login from './Login';
// import Signup from './Signup';

// function LandingPage() {
//     const [showLoginModal, setShowLoginModal] = useState(false);
//     const [showSignupModal, setShowSignupModal] = useState(false);
    
//     const handleLoginClick = () => {
//         setShowSignupModal(false); // Close signup modal if open
//         setShowLoginModal(true);
//     };
    
//     const handleCloseModal = () => {
//         setShowLoginModal(false);
//     };
    
//     const handleSignupCloseModal = () => {
//         setShowSignupModal(false);
//     };

//     const handleSignupClick = () => {
//         setShowLoginModal(false); // Close login modal if open
//         setShowSignupModal(true);
//     };

//     // Background styles using the imported image
//     const backgroundStyle = {
//         backgroundImage: `url(${landingBg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         height: '100vh',
//         width: '100%',
//         position: 'relative'
//     };
    
//     const overlayStyle = {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'rgba(0, 0, 0, 0.6)' // Dark overlay
//     };
    
//     const logoStyle = {
//         display: 'flex',
//         alignItems: 'center',
//         color: 'white',
//         textDecoration: 'none',
//         fontSize: '1.5rem',
//         fontWeight: 'bold'
//     };
    
//     // Modal styles
//     const modalOverlayStyle = {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 1000
//     };
    
//     const modalStyle = {
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         maxWidth: '500px',
//         width: '100%',
//         position: 'relative',
//         zIndex: 1001
//     };
    
//     const closeButtonStyle = {
//         position: 'absolute',
//         top: '10px',
//         right: '10px',
//         background: 'none',
//         border: 'none',
//         fontSize: '1.5rem',
//         cursor: 'pointer'
//     };
    
//     return (
//         <div>
//             <div style={backgroundStyle}>
//                 {/* Dark overlay */}
//                 <div style={overlayStyle}></div>
                
//                 {/* Navigation */}
//                 <nav className="navbar navbar-expand-lg w-100" style={{ position: 'relative', zIndex: 5 }}>
//                     <div className="container py-3">
//                         {/* Logo */}
//                         <div style={logoStyle}>
//                             <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
//                                 SC
//                             </div>
//                             SecureConnect
//                         </div>
                        
//                         {/* Login Button */}
//                         <button 
//                             className="btn btn-light rounded ms-lg-4"
//                             onClick={handleLoginClick}
//                         >
//                             LOG IN
//                         </button>
//                     </div>
//                 </nav>
                
//                 {/* Main Content */}
//                 <div className="container" style={{ position: 'relative', zIndex: 5 }}>
//                     <div className="row min-vh-100 align-items-center">
//                         <div className="col-lg-6 text-white">
//                             <h1 className="display-4 fw-bold mb-4">Welcome to SecureConnect, </h1>
//                             <p className="lead mb-4"> a secure and user-friendly authentication system!</p>
//                             <button 
//                                 className="btn btn-primary btn-lg me-3"
//                                 onClick={handleSignupClick}
//                             >
//                                 Get Started
//                             </button>
//                             <button 
//                                 className="btn btn-outline-light btn-lg"
//                                 onClick={handleLoginClick}
//                             >
//                                 Sign In
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             {/* Login Modal */}
//             {showLoginModal && (
//                 <div style={modalOverlayStyle}>
//                     <div style={modalStyle}>
//                         <button style={closeButtonStyle} onClick={handleCloseModal}>×</button>
//                         <div className="p-4"> 
//                             <Login onSignupClick={handleSignupClick} /> {/* Pass handler to Login */}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Signup Modal */}
//             {showSignupModal && (
//                 <div style={modalOverlayStyle}>
//                     <div style={modalStyle}>
//                         <button style={closeButtonStyle} onClick={handleSignupCloseModal}>×</button>
//                         <div className="p-4"> 
//                             <Signup onLoginClick={handleLoginClick} /> {/* Pass handler to Signup */}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default LandingPage;





import React, { useState, useEffect } from 'react';
import landingBg from './assets/images/Landingbg.jpg';
import Login from './Login';
import Signup from './Signup';

function LandingPage() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    
    // Add effect to prevent body scrolling when component mounts
    useEffect(() => {
        // Save original styles
        const originalOverflow = document.body.style.overflow;
        const originalHeight = document.body.style.height;
        const originalPosition = document.body.style.position;
        
        // Apply no-scroll styles
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
        // Restore original styles on unmount
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.height = originalHeight;
            document.body.style.position = originalPosition;
            document.body.style.width = '';
        };
    }, []);
    
    const handleLoginClick = () => {
        setShowSignupModal(false); // Close signup modal if open
        setShowLoginModal(true);
    };
    
    const handleCloseModal = () => {
        setShowLoginModal(false);
    };
    
    const handleSignupCloseModal = () => {
        setShowSignupModal(false);
    };

    const handleSignupClick = () => {
        setShowLoginModal(false); // Close login modal if open
        setShowSignupModal(true);
    };

    // Background styles using the imported image with fixed position
    const backgroundStyle = {
        backgroundImage: `url(${landingBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // This ensures the background is fixed when scrolling
        height: '100vh',
        width: '100%',
        position: 'fixed', // Changed from relative to fixed
        top: 0,
        left: 0,
        overflowY: 'hidden' // Hide vertical scrollbar
    };
    
    const contentContainerStyle = {
        position: 'relative',
        width: '100%',
        height: '100vh',
        zIndex: 2
    };
    
    const overlayStyle = {
        position: 'fixed', // Changed from absolute to fixed
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)' // Dark overlay
    };
    
    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    };
    
    // Modal styles
    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    };
    
    const modalStyle = {
        backgroundColor: 'white',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        zIndex: 1001
    };
    
    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer'
    };
    
    return (
        <div style={{ overflow: 'hidden', height: '100vh' }}>
            <div style={backgroundStyle}>
                {/* Dark overlay */}
                <div style={overlayStyle}></div>
            </div>
            
            {/* Content container */}
            <div style={contentContainerStyle}>
                {/* Navigation */}
                <nav className="navbar navbar-expand-lg w-100" style={{ position: 'relative', zIndex: 5 }}>
                    <div className="container py-3">
                        {/* Logo */}
                        <div style={logoStyle}>
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
                                SC
                            </div>
                            SecureConnect
                        </div>
                        
                        {/* Login Button */}
                        <button 
                            className="btn btn-light rounded ms-lg-4"
                            onClick={handleLoginClick}
                        >
                            LOG IN
                        </button>
                    </div>
                </nav>
                
                {/* Main Content */}
                <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                    <div className="row min-vh-100 align-items-center">
                        <div className="col-lg-6 text-white">
                            <h1 className="display-4 fw-bold mb-4">Welcome to SecureConnect, </h1>
                            <p className="lead mb-4"> a secure and user-friendly authentication system!</p>
                            <button 
                                className="btn btn-primary btn-lg me-3"
                                onClick={handleSignupClick}
                            >
                                Get Started
                            </button>
                            <button 
                                className="btn btn-outline-light btn-lg"
                                onClick={handleLoginClick}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Login Modal */}
            {showLoginModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <button style={closeButtonStyle} onClick={handleCloseModal}>×</button>
                        <div className="p-4"> 
                            <Login onSignupClick={handleSignupClick} /> {/* Pass handler to Login */}
                        </div>
                    </div>
                </div>
            )}

            {/* Signup Modal */}
            {showSignupModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <button style={closeButtonStyle} onClick={handleSignupCloseModal}>×</button>
                        <div className="p-4"> 
                            <Signup onLoginClick={handleLoginClick} /> {/* Pass handler to Signup */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LandingPage;