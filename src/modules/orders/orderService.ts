import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";

export const checkoutCartService = async(userId:number)=>{
    let totalCost = 0;
    //wrap the whole thing in transaction so if it failed it rollbacks all the things
    await prisma.$transaction(async(tx)=>{
        //finding the user cart
        const userCart = await tx.cart.findUnique({
            where:{userId},
            include:{
                items:{
                    include:{
                        product:{
                            select:{
                                price:true
                            }
                        }
                    }
                }
            }});
        if(!userCart){
            throw new AppError("User cart doesn't exist.",404);
        }
        //check for cart being empty
        if(userCart.items.length === 0){
            throw new AppError("Cart is empty",400);
        }
        //calculate total cost
        userCart.items.forEach(item=>{
            totalCost += Number(item.product.price) * item.quantity
        })
        const order = await tx.order.create({data:{totalAmount:totalCost,userId},select:{id:true}});
        for(const item of userCart.items){
            await tx.orderItem.create(
                {data:{
                    price:item.product.price,
                    quantity:item.quantity,
                    orderId:order.id,
                    productId:item.productId
                }})
        }
        return order;
    });


}