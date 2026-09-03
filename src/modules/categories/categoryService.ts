import {prisma} from "../../lib/prisma.js";

export const getCategoriesService = async()=>{
    return await prisma.category.findMany();
}