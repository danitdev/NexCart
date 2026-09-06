import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";
import {CreateProducInput} from "./productSchema.js";

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

export const postProductService = async(data:CreateProducInput)=>{
    const product = await prisma.product.create({data:{
        name:data.name,
        price:data.price,
        categoryId:1,
        description:data.description,
        imageUrl:"/test-URL",  // TODO: have to make the products be able to upload some
        stock: data.stock
    }});
    return product;
}