import {z} from "zod";

enum OrderStatus  {
    PENDING= "PENDING",
    PROCESSING= "PROCESSING",
    SHIPPED= "SHIPPED",
    DELIVERED="DELIVERED",
    CANCELLED= "CANCELLED"
};



export const updateOrderStatusSchema = z.object({
  status:z.enum(OrderStatus,{error:"Invalid option: expected one of PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED"})  
})
