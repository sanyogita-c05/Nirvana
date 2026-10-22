import jwt from "jsonwebtoken";

// rememberMe === true  -> long-lived token (default 30d)
// rememberMe === false -> short-lived token (default 1d)
// rememberMe undefined -> old behaviour (JWT_EXPIRY or 7d), used by register
const generateToken = (user, rememberMe) => {
    let expiresIn;

    if (rememberMe === true) {
        expiresIn = process.env.JWT_REMEMBER_EXPIRY || "30d";
    } else if (rememberMe === false) {
        expiresIn = process.env.JWT_SHORT_EXPIRY || "1d";
    } else {
        expiresIn = process.env.JWT_EXPIRY || "7d";
    }

    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn }
    );
};

export default generateToken;