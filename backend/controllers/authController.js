import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import transporter from "../config/emailConfig.js";

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
        const verificationToken = crypto.randomBytes(32).toString("hex")
    
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            verificationToken: verificationToken
        });

        // const verifyURL = `http://localhost:5000/api/auth/verify/${verificationToken}`

        const verifyURL = `https://taskflow-edwh.onrender.com/api/auth/verify/${verificationToken}`

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Verify your TaskFlow account",
            html: `
                <h2>Welcome to TaskFlow !</h2>
                <p>Click below to verify your email:</p>
                <a href="${verifyURL}"> Verify Email</a> 
            `
        })
    
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


export const verifyEmail = async (req ,res ) => {
    try {
        const {token} = req.params;
        const user = await User.findOne({verificationToken: token})

        if(!user) {
            return res.status(400).json({
                message: "Invalid token"
            })
        }

        user.isVerified = true;
        user.verificationToken = "";
        await user.save()

        res.status(200).send(`
            <html>
                <body style="font-family: sans-serif; text-align: center; padding: 50px;">
                    <h1>✅ Email Verified!</h1>
                    <a href="https://inspiring-scone-85621e.netlify.app/login">
                    // <a href="http://localhost:5173/login">
                    //     Login here !!
                    // </a>
                </body>
            </html>
        `)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


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

        if(!existingEmail.isVerified) {
            return res.status(401).json({
                message: "Please verify your email first !"
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