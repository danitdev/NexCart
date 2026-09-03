import {Request,Response,NextFunction} from "express";
import { getProductsService } from "./productService.js";
import { AppError } from "../../errors/AppError.js";



export const getProcuts = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const products = await getProductsService();
            res.status(200).json({products:products});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}