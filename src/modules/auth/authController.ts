import type {Request,Response,NextFunction} from "express";
import {signup_user} from "./authService.js";
import {CreateUserInput} from "./authSchema.js";
import {AppError} from "../../errors/AppError.js";

export const signUp = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const data:CreateUserInput = req.body;
            const user = await signup_user(data);
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

