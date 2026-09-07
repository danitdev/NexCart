import jwt from "jsonwebtoken";
import "dotenv/config";
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId:number,email:string)=>{
    if(JWT_SECRET){
        return jwt.sign({userId,email},JWT_SECRET,{expiresIn:"1h"});
    }
}