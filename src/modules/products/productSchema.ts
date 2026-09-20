import {z} from "zod";

export const createProductSchema = z.object({
    price: z.coerce.number().nonnegative().max(99999999.99).multipleOf(0.01),
    name: z.string().trim().min(1).max(255),
    description: z.string().trim().max(2000).optional(),
    stock: z.coerce.number().int().nonnegative().default(0),
    imageUrl: z.string().url().optional(),
    categoryId: z.coerce.number().int().positive()

});

export const productQuerySchema = z.object({
    search:z.string().optional(),
    categoryId: z.coerce.number().int().positive().optional(),
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
    available: z.coerce.boolean().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional()
}).refine(
    data=> data.minPrice === undefined || data.maxPrice === undefined || data.minPrice <= data.maxPrice,{
        message:"minPrice cannot be greater than maxPrice",
        path:["minPrice"]
    }
)

export const updateProductSchema = z.object({
    price: z.coerce.number().nonnegative().max(99999999.99).multipleOf(0.01).optional(),
    name: z.string().trim().max(255).optional(),
    description: z.string().trim().max(2000).optional(),
    stock: z.coerce.number().int().nonnegative().optional(),
    imageUrl: z.string().url().optional(),
    categoryId: z.coerce.number().int().positive().optional()

    // USING refine to tell the customer to update at least one field
}).refine(data=>Object.keys(data).length>0,{message:"at least one field must be provided"});

export type CreateProducInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;