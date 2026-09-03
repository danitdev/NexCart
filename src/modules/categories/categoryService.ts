import {prisma} from "../../lib/prisma.js";

export const getCategoriesService = async()=>{
    return await prisma.category.findMany();
}

export const postCategoryService = async(categoryName:string)=>{
    const category = await prisma.category.create({data:{
        name: categoryName
    }});
    return category;

}

export const getCategoryService = async(categoryId:number)=>{
    const category =  await prisma.category.findUnique({where:{id:categoryId}});
    if(!category){
        throw new Error("This Shit doesn't exist!");
    }
    return category;
}