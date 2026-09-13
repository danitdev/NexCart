import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";
import {UpdateReview} from "./reviewSchema.js";
import { updateReview } from "./reviewController.js";

export const postReviewService = async(userId:number,productId:number,comment:string,rating:number)=>{
    const product = await prisma.product.findUnique({
        where:{id:productId}
    });
    if(!product){
        throw new AppError("Product not found.",404);
    }
    const existingReview = await prisma.review.findUnique({
        where:{
            userId_productId:{
                productId,userId
            }
        }
    })
    if(existingReview){
        throw new AppError("You have already reviewed this product",400);
    }
    const review = await prisma.review.create({
        data:{
            userId,
            productId,
            comment,
            rating
        }
    });
    return review;
}

export const deleteReviewService = async(userId:number,productId:number)=>{
    const product = await prisma.product.findUnique({
        where:{id:productId}
    });
    if(!product){
        throw new AppError("Product not found.",404);
    }
    const review = await prisma.review.findUnique({
        where:{userId_productId:{
            productId:productId,
            userId:userId
        }}
    });
    if(!review){
        throw new AppError("There is no review from this user on this product",400);
    }
    await prisma.review.delete({
        where:{userId_productId:{
            userId,
            productId
        }}
    });
}


export const updateReviewService = async(userId:number,productId:number,data:UpdateReview)=>{
    try{

        const product = await prisma.product.findUnique({
            where:{id:productId}
        });
        if(!product){
            throw new AppError("Product not found.",404);
        }
        const updatedReview = await prisma.review.update({
            data,
            where:{
                userId_productId:{
                    userId,
                    productId
                }
            }
        });
        return updatedReview;
    }
    catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025"){
            throw new AppError("Review not found.",404);
        }
        throw error;
    }
}