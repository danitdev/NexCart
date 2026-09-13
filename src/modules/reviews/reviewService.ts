import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";


export const postReviewService = async(userId:number,productId:number,comment:string,rating:number)=>{
    const product = await prisma.product.findUnique({
        where:{id:productId}
    });
    if(!product){
        throw new AppError("Product not found.",404);
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