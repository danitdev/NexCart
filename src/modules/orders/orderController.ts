import type {Request,Response,NextFunction} from "express";
import { AppError } from "../../errors/AppError.js";
import {parseId} from "../../utils/parseId.js";
import { checkoutCartService, getOrderByIdAdminService, getOrderByIdService, getOrdersAdminService, getOrdersService, updateOrderStatusByAdminService } from "./orderService.js";


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


export const updateOrderStatusByAdmin = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const orderId = parseId(req.params.id);
            const orderStatus = req.body.status;
            const updatedOrder = await updateOrderStatusByAdminService(orderId,orderStatus);
            res.status(200).json({updatedOrder});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }

};

export const getOrdersAdmin = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const orders = await getOrdersAdminService();
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

export const getOrderByIdAdmin = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const orderId = parseId(req.params.id);
            const order = await getOrderByIdAdminService(orderId);
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