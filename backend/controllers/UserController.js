import User from '../model/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//token generation
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET,{ expiresIn: '7d' })
}

export const registerUser = async (req, res) => {
    
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const userExits = await User.findOne({ email})
        if(userExits){
            return res.status(400).json({ message: "User already exists" });
        }
        if(password.length < 8){
            return res.status(400).json({success:false, message: "Password must be at least 8 characters" });
        }
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        res.status(201).json({
            
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            
        })
    }
    catch (error){
        res.status(500).json({
             message: "erver error",
             error: error.message
             });

    }
}

//login
export const loginUser = async( req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
            if(!user){
                return res.status(500).json({ message: "Invalid email or passowrd" });
            }
        //compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).json({ message: "Invalid email or passowrd" })
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })

        
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }}

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
         message:" server error",
          error: error.message
         })
  }
}
