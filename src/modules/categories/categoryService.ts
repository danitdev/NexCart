import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";

export const getCategoriesService = async()=>{
    return await prisma.category.findMany();
}

export const postCategoryService = async(categoryName:string)=>{
    try{
        const category = await prisma.category.create({data:{
            name: categoryName
        }});
        return category;
    }catch(err){
        if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002"){
            throw new AppError("Category already exists.",409);
        }
        throw err;
    }

}

export const getCategoryService = async(categoryId:number)=>{
    const category =  await prisma.category.findUnique({where:{id:categoryId}});
    if(!category){
        throw new AppError("This Shit doesn't exist!",404);
    }
    return category;
}
export const updateCategoryService = async(categoryId:number,categoryName:string)=>{
    try{
        return await prisma.category.update({
            where:{id:categoryId},
            data:{name:categoryName}
        });
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025"){
            throw new AppError("Category not found.",404);
        }
        throw error;
    }
}

export const deleteCategoryService = async(categoryId:number)=>{
    try{
        await prisma.category.delete({where:{id:categoryId}});
    }
    catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003"){
            throw new AppError("Cannot delete category because it contains products.",409);
        }
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025"){
            throw new AppError("Category not found.",404);
        }
        throw error;
    }
}