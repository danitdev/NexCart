import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";
import {CreateProducInput,UpdateProductInput} from "./productSchema.js";

export const getProductsService = async(search?:string,category?:string,priceMin?:string,priceMax?:string,available?:string)=>{
    const priceFilter = {
        ...(priceMin && {
            gte:Number(priceMin)
        }),
        ...(priceMax && {
            lte:Number(priceMax)
        })
    };
    
    return await prisma.product.findMany({
        where: {
            ...(search &&{
                OR:[
                    {name:{contains:search}},
                    {description:{contains:search}}
                ]
            }),
            ...(category && {
                categoryId:Number(category)
            }),
            ...(priceMin || priceMax ?{
                price:priceFilter
            }:{}),
            ...(available && {
                stock:{gt:0}
            })
        }
    });
};

export const getProductService = async(productId:number)=>{
    const product = await prisma.product.findUnique(
        {
            where:
            {
                id:productId,
            },
            include:{
                reviews:{
                    select:{
                        comment:true,
                        rating:true
                    }
                }
            }
        });
    if(!product){
        throw new AppError("this product doesn't exist",404);
    }
    return product;
}

export const postProductService = async(data:CreateProducInput,filename?:string)=>{
    const category = await prisma.category.findUnique({
        where: {
            id: data.categoryId
        }
    });
    //check for categoryId passed from admin
    if (!category) {
        throw new AppError("Category not found.", 404);
    }
    const product = await prisma.product.create({
        data:{
            ...data,
            imageUrl: filename? `/images/${filename}` : undefined
        }});
    return product;
}

export const patchProductService = async(productId:number,data:UpdateProductInput,filename?:string)=>{
    try{
        if(data.categoryId !== undefined){
            const category = await prisma.category.findUnique({
            where: {
                id: data.categoryId
            }
            });
            //check for categoryId passed from admin
            if (!category) {
                throw new AppError("Category not found.", 404);
            }
        }
        const updatedProduct = await prisma.product.update({
            where:{
                id:productId
            },
            data:{
            ...data,
            imageUrl: filename? `/images/${filename}` : undefined
        }});
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