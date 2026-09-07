import {z} from "zod";

export const createUserSchema = z.object({
    name: z.string().trim().min(2).max(100).optional(),
    email: z.email().trim().toLowerCase(),
    password: z.string().min(8).max(255),
});


export type CreateUserInput = z.infer<typeof createUserSchema>;