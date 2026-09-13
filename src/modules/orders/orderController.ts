import type {Request,Response,NextFunction} from "express";
import { AppError } from "../../errors/AppError.js";
import {parseId} from "../../utils/parseId.js";
import { checkoutCartService, getOrderByIdService, getOrdersService } from "./orderService.js";


export const getOrders = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const orders = await getOrdersService(req.userId!);
            res.status(200).json({orders});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }

};
export const getOrderById = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const orderId = Number(req.params.id);
            const order = await getOrderByIdService(req.userId!,orderId);
            res.status(200).json({order});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }

};
export const checkoutCartToOrder = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const order = await checkoutCartService(req.userId!);
            res.status(200).json({msg:"order checkout.",order});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }

};