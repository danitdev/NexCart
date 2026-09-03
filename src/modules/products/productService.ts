import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";


export const getProductsService = async()=>{
    return await prisma.product.findMany();
}