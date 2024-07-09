import User from '../model/user.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()


export const SignUp = async (req, res) => {
    try {
        const {firstName, lastName, username, email, password } = req.body;
       
        if(!firstName) {
            return res.status(400).json({success:false, message: "FirstName is required"});
        }
        if(!lastName) {
            return res.status(400).json({success:false, message: "LastName is required"});
        }
        if(!username) {
            return res.status(400).json({success:false, message: "UserName is required"});
        }
        if(!email) {
            return res.status(400).json({success:false, message: "Email is required"});
        }
        if(!password) {
            return res.status(400).json({success:false, message: "Password is required"});
        }
   

        
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({success:false, message: "Email is taken"});
        }

        const hashed = await hashPassword(password);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashed,
            });
    
        await newUser.save();

        const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        return res.json({success: true, newUser, token});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if(!email) {
            return res.status(400).json({success:false, message: "Email is required"});
        }
        if(!password) {
            return res.status(400).json({success:false, message: "Password is required"});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({success:false, message: "User not found"});
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(400).json({success:false, message: "Incorrect password"});
        }

        
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: 86400
        });

        return res.json({success: true, message: "Login Successful" , user , token});
    } catch (err) {
        console.log("Error creating registration", err.message);
        return res.status(500).json({message: "Registration failed", err});
    }
}