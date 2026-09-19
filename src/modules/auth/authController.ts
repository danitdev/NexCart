import type {Request,Response,NextFunction} from "express";
import {forgotPasswordService, loginUserService, resetPasswordService, signupUserService} from "./authService.js";
import {CreateUserInput,LoginUserInput} from "./authSchema.js";
import {AppError} from "../../errors/AppError.js";

export const signUp = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const data:CreateUserInput = req.body;
            const user = await signupUserService(data);
            res.status(201).json({user,msg:"user created!"})
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}

export const login = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{   
            const data:LoginUserInput = req.body;
            const {token,userId} = await loginUserService(data);
            res.status(200).json({token,userId}); 
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}

export const forgotPassword = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{   
            const email = req.body.email;
            const {message,url,token} = await forgotPasswordService(email);
            res.status(200).json({message,url}); 
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}

export const resetPassword = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{   
            const newPassword = req.body.password;
            const token = req.query.token;
            if(typeof token !== "string"){
                throw new AppError("Invalid reset token",400);
            }
            const msg = await resetPasswordService(token,newPassword);
            res.status(200).json({msg});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}