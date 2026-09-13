import type {Request,Response,NextFunction} from "express";
import { AppError } from "../../errors/AppError.js";
import {parseId} from "../../utils/parseId.js";
import {deleteReviewService, postReviewService, updateReviewService} from "./reviewService.js";
import { UpdateReview } from "./reviewSchema.js";

export const postReview = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const id = parseId(req.params.id);
            const rating = req.body.rating;
            const comment = req.body.comment;
            const review = await postReviewService(req.userId!,id,comment,rating);
            res.status(201).json({review});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }

};
export const deleteReview = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const productId = parseId(req.params.id);
            await deleteReviewService(req.userId!,productId);
            res.status(204).send();
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }

};

export const updateReview = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const productId = parseId(req.params.id);
            const data:UpdateReview = req.body;
            const updatedReview = await updateReviewService(req.userId!,productId,data);
             res.status(200).json({updatedReview,msg:"Review updated!"});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }

};
