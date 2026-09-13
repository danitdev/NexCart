import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../errors/AppError.js";
import { Prisma } from "../../generated/prisma/client.js";

export const checkoutCartService = async (userId: number) => {
    // wrap the whole thing in transaction so if it failed it rolls back all the things
    const order = await prisma.$transaction(async (tx) => {
        // finding the user cart
        const userCart = await tx.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                price: true,
                                stock: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });
        if (!userCart) {
            throw new AppError("User cart doesn't exist.", 404);
        }
        // check for cart being empty
        if (userCart.items.length === 0) {
            throw new AppError("Cart is empty", 400);
        }
        // calculate total cost
        let totalCost = 0;
        userCart.items.forEach(item => {
            totalCost += Number(item.product.price) * item.quantity;
        });
        const createdOrder = await tx.order.create({
            data: {
                totalAmount: totalCost,
                userId
            },
            select: {
                id: true
            }
        });
        for (const item of userCart.items) {
            // check for enough stocks
            if (item.product.stock < item.quantity) {
                throw new AppError(
                    `Not enough stock for ${item.product.name}`,
                    400
                );
            }
            // subtract the quantity
            await tx.product.update({
                where: {
                    id: item.productId
                },
                data: {
                    stock: {
                        decrement: item.quantity
                    }
                }
            });
            await tx.orderItem.create({
                data: {
                    price: item.product.price,
                    quantity: item.quantity,
                    orderId: createdOrder.id,
                    productId: item.productId
                }
            });
        }
        //emptying the cart
        await tx.cartItem.deleteMany({where:{cartId:userCart.id}});
        //finalize the order
        const order = await tx.order.findUnique({
            where: {
                id: createdOrder.id
            },
            include: {
                items: true
            }
        });
        return order;
    });
    return order;
};


export const getOrdersService = async(userId:number)=>{
    const orders = await prisma.order.findMany({
        where:{
            userId
        },
        include:{
            items:{
                include:{
                    product:{
                        select:{
                            name:true,  
                            price:true,
                            imageUrl:true,
                            category:true,
                            
                        }
                    }
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        }
        });
    return orders;
}

export const getOrderByIdService = async(userId:number,orderId:number)=>{
    const order = await prisma.order.findUnique({
        where:{
            id:orderId,userId
        },
        include:{
            items:{
                include:{
                    product:{
                        select:{
                        name: true,
                        price: true,
                        imageUrl: true,
                        category: true
                        }
                    }
                }
            }
        }});
    if(!order){
        throw new AppError("Order not found",404);
    }
    return order;
}