export default function SignupValidation(values = {}) {
    let errors = {};
    
    const username = values.username?.trim() || "";
    const password = values.password?.trim() || "";
    const confirmpw = values.confirmpw?.trim() || "";
    
    // Username Validation
    if (!username) {
        errors.username = "Username should not be empty";
    } else if (username.length < 8) {
        errors.username = "Username must be at least 8 characters long";
    }
    
    // Password Validation
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    if (!password) {
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
    if (!confirmpw) {
        errors.confirmpw = "Confirm Password should not be empty";
    } else if (confirmpw !== password) {
        errors.confirmpw = "Passwords do not match";
    }
    
    return errors;
}
