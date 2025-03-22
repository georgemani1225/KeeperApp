import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false,
                error: true
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
                error: true
            });
        }

        const user = new User({
            name, email, password
        });

        user.password = await bcrypt.hash(password, 10);




        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            success: false,
            error: true
        });

    } catch (error) {
        res.send(401).json({ message: "Error in Registering user", success: false, error: true });
    }

}

export const Login = async (req, res) => {
    try {
        const {email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false,
                error: true
            });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false,
                error: true
            });
        }

       const isMatch =  await bcrypt.compare(password, user.password);
       if(!isMatch){
        return res.status(400).json({
            message: "Invalid Email or Password",
            success: false,
            error: true
        });
       }

       const jwttoken = jwt.sign({email: user.email, _id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

       res.status(200).json({
        message: "User logged in successfully",
        success: true,
        error: false
    });

    } catch (error) {
        res.send(401).json({ message: "Error in login", success: false, error: true });
    }
}