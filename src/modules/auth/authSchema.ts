import {z} from "zod";

export const createUserSchema = z.object({
    name: z.string().trim().min(2).max(100).optional(),
    email: z.email().trim().toLowerCase(),
    password: z.string().min(8).max(255)
        .regex(/[A-Z]/,"Password must contain at least one uppercase letter.")
        .regex(/[a-z]/,"Password must contain at least one lowercase letter.")
        .regex(/[0-9]/,"Password must contain at least one number.")
        .regex(/[^A-Za-z0-9]/,"Password must contain at least one special character"),
    confirmPassword: z.string()
}).refine(
    data=> data.password === data.confirmPassword,{
        message:"Passwords do not match.",
        path:["confirmPassword"]
    }
)


export type CreateUserInput = z.infer<typeof createUserSchema>;