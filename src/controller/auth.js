import User from '../model/user.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import { cloudinary } from '../helpers/cloudinary.config.js';
import { sendResetEmail } from '../helpers/email.js';
dotenv.config()


export const SignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const image = req.file;

        if (!firstName) {
            return res.status(400).json({ success: false, message: "FirstName is required" });
        }
        if (!lastName) {
            return res.status(400).json({ success: false, message: "LastName is required" });
        }
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }

        const existingUser = await User.findOne( {email} );
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email is taken" });
        }

        const hashed = await hashPassword(password);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashed,
        });

        if (image) {
            try {
                const imagePath = await cloudinary.uploader.upload(image.path);
                user.image = imagePath.secure_url;
                user.imagePublicId = imagePath.public_id;
            } catch (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: "Error uploading image", error: err.message });
            }
        }

        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 86400,
        });

        return res.json({ success: true, user, token });
    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};


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

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) {
            return res.status(400).json({success:false, message: "Email is required"});
        }

        // find user by email
        const user = await User.findOne({email});
        if (!user){
            return res.status(404).json({success:false, message: "User not found"});
        }

        // OTP and send to user

        // Generate password reset token
        const resetToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        // send reset token to user's email address
        const domain = "https://beta-housegharneeyart-shuaib-ganiyats-projects.vercel.app"
        // const resetLink = `${domain}/reset/${resetToken}`

        await sendResetEmail(email, `${domain}/reset/${resetToken}`);

        // send response including the reset token
        return res.json({message: "Password reset token generated successfully", resetToken})
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Password reset token failed"});
    }
};

// resetPassword function
export const resetPassword = async(req, res) => {
    try {
      const { newPassword } = req.body;
  
      const resetToken = req.headers.authorization
  
      if(!newPassword){
        return res.status(400).json({success: false, message: 'Enter new password'})
      }
      if(!resetToken || !resetToken.startsWith("Bearer")){
        return res.status(401).json({success: false, message: 'invalid token or no reset token provided'}) 
      }
  
      //get token without the "Bearer"
      const token = resetToken.split(" ")[1]
      // console.log(token);
  
      // verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
  
      if(!decodedToken){
        return res.status(403).json({success: false, message: "Invalid/expired token provided"})
      }
      const userId = decodedToken.userId
      // console.log(userId);
  
      //find user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ error: "Invalid user" });
      }
  
      const hashedPassword = await hashPassword(newPassword);
  
      user.password = hashedPassword;
  
      // save user (including the new password)
      await user.save();
  
      res.json({success: true, message: "Password reset successfully" });
  
      
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({success: false, message: "Password reset failed", error: err.message});
      
    }
  }