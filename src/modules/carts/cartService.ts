import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";



export const getCartService = async(userId:number)=>{
    return await prisma.cart.findUnique({
        where:{userId},
        include:{
            items:{
                include:{
                    product:true
                }
            }
        }
    });
}