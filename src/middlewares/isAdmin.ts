import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/AppError.js";


export const isAdmin = async(
    req:Request,
    res:Response,
    next:NextFunction
) =>{
    try{
        const userId = req.userId;
        if(!userId){
            return next(new AppError("Authentication required.",401));
        }
        const user = await prisma.user.findUnique({where:{id:userId},select:{role:true}});
        if(!user){
            return next(new AppError("User not found.",404));
        }
        if(user.role !== "ADMIN"){
            return next(new AppError("Admin access required.",403));
        }
        next();
    }catch(err){
        next(err);
    }
}