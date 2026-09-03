import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";


export const getProductsService = async()=>{
    return await prisma.product.findMany();
}
export const getProductService = async(productId:number)=>{
    const product = await prisma.product.findUnique({where:{id:productId}});
    if(!product){
        throw new AppError("this product doesn't exist",404);
    }
    return product;
}