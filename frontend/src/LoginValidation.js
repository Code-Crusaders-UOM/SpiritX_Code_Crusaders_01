function validation(values) {
    let errors = {};
    
    // Username validation
    if (!values.username?.trim()) {
        errors.username = "Username should not be empty";
    } else if (values.username.length < 8) {
        errors.username = "Username must be at least 8 characters long";
    }
    
    // Password validation
    const hasLowercase = /[a-z]/.test(values.password);
    const hasUppercase = /[A-Z]/.test(values.password);
    // Fixed regex to avoid unnecessary escape characters
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(values.password);
    
    if (!values.password?.trim()) {
        errors.password = "Password should not be empty";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    } else if (!hasLowercase || !hasUppercase || !hasSpecialChar) {
        let missingReqs = [];
        if (!hasLowercase) missingReqs.push("lowercase letter");
        if (!hasUppercase) missingReqs.push("uppercase letter");
        if (!hasSpecialChar) missingReqs.push("special character");
        
        errors.password = `Password must contain: ${missingReqs.join(", ")}`;
    }
    
    return errors;
}

export default validation;