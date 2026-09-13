import type {Request,Response,NextFunction} from "express";
import { AppError } from "../../errors/AppError.js";
import {parseId} from "../../utils/parseId.js";
import {postReviewService} from "./reviewService.js";

export const postReview = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const id = parseId(req.params.id);
            const rating = req.body.rating;
            const comment = req.body.comment;
            const review = await postReviewService(req.userId!,id,comment,rating);
            res.status(200).json({review});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }

};