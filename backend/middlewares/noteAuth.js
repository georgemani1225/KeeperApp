import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const ensureAuthenticated = async(req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            error: true
        });
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id).select("-password");
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "JWT token is required",
            success: false,
            error: true
        });

    }
}