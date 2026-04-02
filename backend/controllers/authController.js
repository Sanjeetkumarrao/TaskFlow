import User from "../models/User.js";
import bcrypt from "bcryptjs";

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
