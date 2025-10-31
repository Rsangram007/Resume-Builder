import User from'../model/UserModel.js'
import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
    try {
         let token =req.headers.authorization;
        console.log("Authorization Header:", token);       
        if(token && token.startsWith("Bearer")){
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password")
            console.log("Authenticated User:", req.user);
           next();
        }
        else{
            res.status(401).json({message: "not authorized, no token found"})
        }
        }
    catch (error) {
        res.status(401).json({
            message: "token failed",
            error: error.message
        })
        
    }
};