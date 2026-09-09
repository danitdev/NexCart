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

export const addToCartService = async(userId:number,productId:number,quantity:number)=>{
    try{
        const cart = await prisma.cart.findUnique({where:{userId}});
        if(!cart){
            throw new AppError("Cart not found",404);
        }
        const product = await prisma.product.findUnique({
            where:{
                id:productId
            }
        });
        if(!product){
            throw new AppError("Product not found",404);
        }
        if(product.stock<quantity){
            throw new AppError("Not enough stock.",400);
        }
        const existingItem = await prisma.cartItem.findUnique({
            where:{
                cartId_productId:{
                    cartId:cart.id,
                    productId
                }
            }
        });
        if(existingItem){
            const newQuantity = existingItem.quantity + quantity;
            if(newQuantity >product.stock){
                throw new AppError("Not enough stock",400);
            }
            return await prisma.cartItem.update({
                where:{
                    id:existingItem.id
                },
                data:{
                    quantity: newQuantity
                }
            })
        }
        return await prisma.cartItem.create({
            data:{
                cartId:cart.id,
                productId,
                quantity
            }
        });
    }
    catch(err){
        throw err;
    }
}