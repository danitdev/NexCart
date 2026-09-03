import {Request,Response,NextFunction} from "express";
import { getProductService, getProductsService } from "./productService.js";
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

export const getProduct = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const productId = Number(req.params.id);
            const product = await getProductService(productId);
            res.status(200).json({product:product});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}