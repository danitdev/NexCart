import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";
import {CreateUserInput} from "./authSchema.js";
import argon2 from "argon2";

export const signup_user = async(data:CreateUserInput)=>{
    const hashedPass = await argon2.hash(data.password,
        {
            type: argon2.argon2id,
            memoryCost: 65536,
            timeCost:3,
            parallelism:4
        });
    const user = await prisma.user.create({data:{
        email: data.email,
        password: hashedPass,
        name: data.name
    }});
    return user;

}