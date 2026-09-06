import {Request,Response,NextFunction} from "express";
import { getProductService, getProductsService, postProductService } from "./productService.js";
import { AppError } from "../../errors/AppError.js";
import {CreateProducInput} from "./productSchema.js";


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
export const postProduct = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const data:CreateProducInput = {
                categoryId:1,
                name:req.body.name,
                price:req.body.price,
                stock:req.body.stock,
                description:req.body.description,
                
            }

            // TODO: uploading the image and set the image url
            const product = await postProductService(data);
            res.status(201).json({product,msg:"product created."});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}