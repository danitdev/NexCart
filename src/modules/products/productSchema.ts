import {z} from "zod";

export const createProductSchema = z.object({
    price: z
        .number()
        .nonnegative()
        .max(99999999.99)
        .multipleOf(0.01),
    name: z
        .string()
        .trim()
        .min(1)
        .max(255),
    description: z
        .string()
        .trim()
        .max(2000)
        .optional(),
    stock: z
        .number()
        .int()
        .nonnegative()
        .default(0),
    imageUrl: z
        .string()
        .url()
        .optional(),
    categoryId: z
        .number()
        .int()
        .positive()

});

export type CreateProducInput = z.infer<typeof createProductSchema>;