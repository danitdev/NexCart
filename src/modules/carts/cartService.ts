import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";
import { CartItemScalarFieldEnum, UserScalarFieldEnum } from "../../generated/prisma/internal/prismaNamespace.js";



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
export const updateCartService = async(itemId:number,userId:number,quantity:number)=>{

    if(quantity ===0){
        throw new AppError("Quantity should be more that 0",400);
    }
    const cart =await prisma.cart.findUnique({where:{userId}});
    if(!cart){
        throw new AppError("Cart not found.",404);
    }
    const existingItem = await prisma.cartItem.findFirst({where:{id:itemId,cartId:cart.id}});
    if(!existingItem){
        throw new AppError("This item doesn't exist in your cart.",404);
    }
    const productOfItem = await prisma.product.findUnique({where:{id:existingItem.productId}});
    if(!productOfItem){
        throw new AppError("this item doesn't exist.",404)
    }
    if(quantity > productOfItem.stock ){
        throw new AppError("Not enough stock.",400);
    }
    return await prisma.cartItem.update({where:{id :itemId},data:{quantity}});

}

export const deleteItemFromCartService = async(userId:number,itemId:number)=>{
    const cart = await prisma.cart.findUnique({where:{userId}});
    if(!cart){
        throw new AppError("The cart doesn't exist.",404);
    }
    const itemCart = await prisma.cartItem.findFirst({
        where:{
            id:itemId,
            cartId:cart.id
        }});
    if(!itemCart){
        throw new AppError("The item doesn't exist.",404);
    }
    await prisma.cartItem.delete({
        where:{
            id:itemId
        }
    });
}