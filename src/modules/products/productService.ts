import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";
import {CreateProducInput,UpdateProductInput} from "./productSchema.js";

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

export const patchProductService = async(productId:number,data:UpdateProductInput)=>{
    try{
        const updatedProduct = await prisma.product.update({
            where:{
                id:productId
            },
            data:data
        });
        return updatedProduct;
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025"){
            throw new AppError("Product not found.",404);
        }
        throw error;
    }
}

export const deleteProductService = async(productId:number)=>{
    try{
        // TODO: after writing cruds for reviews delete reviews on deleteProductService also
        await prisma.product.delete({where:{id:productId}});
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025"){
            throw new AppError("Product not found.",404);
        }
        throw error;
    }
}