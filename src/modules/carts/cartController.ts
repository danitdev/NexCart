import type {Request,Response,NextFunction} from "express";
import { addToCartService, getCartService, updateCartService } from "./cartService.js";
import {} from "./cartSchema.js";
import {AppError} from "../../errors/AppError.js";


export const getCart = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const cart = await getCartService(req.userId!);
            res.status(200).json({cart})
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}

export const addToCart = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const productId = Number(req.body.productId);
            const quantity =Number(req.body.quantity);
            const cartItem = await addToCartService(req.userId!,productId,quantity);
            res.status(200).json({cartItem,msg:"added item to the cart"})
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}
export const updateCart = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const itemId = Number(req.params.itemId);
            const quantity = req.body.quantity;
            const updatedCartItem = await updateCartService(itemId,req.userId!,quantity);
            res.status(200).json({updatedCartItem,msg:"updated the item quantity."})
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
}