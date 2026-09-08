import type {Request,Response,NextFunction} from "express";
import { getCartService } from "./cartService.js";
import {} from "./cartSchema.js";
import {AppError} from "../../errors/AppError.js";


export const getCart = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const cart = await getCartService(req.userId!);
            res.status(200).json({cart,msg:"user created!"})
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}