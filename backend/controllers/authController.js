import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

//Register Controller
export const registerUser = async(req , res ) => {
    try {
        const {name, email, password} = req.body;
    
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "Email already registered."
            })
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
    
        return res.status(201).json({
            message: "User Registered succesfully !",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


// LOGIN controller

export const loginUser = async (req , res) => {
    try {
        const {email, password} = req.body;
    
        const existingEmail = await User.findOne({email});
        if(!existingEmail){
            return res.status(404).json({
                message: "User not found with this Email"
            })
        }
    
        const isMatch = await bcrypt.compare(password, existingEmail.password);
    
        if(!isMatch){
            return res.status(401).json({
                message: "Incorrect password !!"
            })
        }
    
        const token = jwt.sign(
            { userId: existingEmail._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );
    
        return res.status(200).json({
            message: "Login Successful",
            user : {
                id: existingEmail._id,
                name: existingEmail.name,
                email: existingEmail.email,
            },
            token: token
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}