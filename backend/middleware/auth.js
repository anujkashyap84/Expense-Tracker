import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


const JWT_SECRET = 'my_jwt_secret_key';
 
export default async function authMiddleware(req, res, next) {
     //Grab your token from the request header
     const authHeader = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized" });   
     }
     const token = authHeader.split(" ")[1];
      
     // To Verify the token
     try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.id).select("-password");
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        req.user = user;
        next();
     } catch (err) {
        console.error("Jwt verification error:", err);
        return res.status(401).json({ success: false, message: "Expired or invalid token" });
     }
    }