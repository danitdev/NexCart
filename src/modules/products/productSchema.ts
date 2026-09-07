import {z} from "zod";

export const createProductSchema = z.object({
    price: z.number().nonnegative().max(99999999.99).multipleOf(0.01),
    name: z.string().trim().min(1).max(255),
    description: z.string().trim().max(2000).optional(),
    stock: z.number().int().nonnegative().default(0),
    imageUrl: z.string().url().optional(),
    categoryId: z.number().int().positive()

});

export const updateProductSchema = z.object({
    price: z.number().nonnegative().max(99999999.99).multipleOf(0.01).optional(),
    name: z.string().trim().max(255).optional(),
    description: z.string().trim().max(2000).optional(),
    stock: z.number().int().nonnegative().optional(),
    imageUrl: z.string().url().optional(),
    categoryId: z.number().int().positive().optional()

    // USING refine to tell the customer to update at least one field
}).refine(data=>Object.keys(data).length>0,{message:"at least one field must be provided"});

export type CreateProducInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;