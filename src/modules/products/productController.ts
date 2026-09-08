import {Request,Response,NextFunction} from "express";
import { deleteProductService, getProductsAvailableService, getProductService, getProductsService, patchProductService, postProductService } from "./productService.js";
import { AppError } from "../../errors/AppError.js";
import {CreateProducInput,UpdateProductInput} from "./productSchema.js";
import {parseId} from "../../utils/parseId.js";

export const getProcuts = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const search = typeof req.query.search === "string" ? req.query.search : undefined;
            const products = await getProductsService(search);
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

export const getProcutsAvailable = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const products = await getProductsAvailableService();
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
            const productId = parseId(req.params.id);
            
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
            const data:CreateProducInput = req.body;

            // TODO: uploading the image and set the image url
            const product = await postProductService(data,req.file?.filename);
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
export const patchProduct = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const productId = parseId(req.params.id);
            const data:UpdateProductInput = req.body;
            const product = await patchProductService(productId,data,req.file?.filename);
            res.status(200).json({product:product,msg:"product updated."});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}

export const deleteProduct = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const productId = parseId(req.params.id);
            await deleteProductService(productId);
            res.status(200).json({msg:"product deleted."});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}