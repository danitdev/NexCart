import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";
import {CreateUserInput,LoginUserInput} from "./authSchema.js";
import argon2 from "argon2";
import {generateToken} from "../../utils/auth.js";

export const signupUserService = async(data:CreateUserInput)=>{
    const hashedPass = await argon2.hash(data.password,
        {
            type: argon2.argon2id,
            memoryCost: 65536,
            timeCost:3,
            parallelism:4
        });
    try{
        const user = await prisma.user.create({data:{
            email: data.email,
            password: hashedPass,
            name: data.name
        }});
        return user;
    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"){
                throw new AppError("Email is already in use.", 409);
            }
        throw error;
    }
}
export const loginUserService = async(data:LoginUserInput)=>{
    let loadedUser = await prisma.user.findUnique({where:{email:data.email}});
    let token;
    if(!loadedUser || !loadedUser.password){
        throw new AppError("Invalid email or password",401);
    }
    const isValid = await argon2.verify(loadedUser.password,data.password);
    if(!isValid){
        throw new AppError("Invalid email or password",401);
    }
    let userId = loadedUser.id;
    generateToken(userId,loadedUser.email);
    //returning token and user id
    return {token,userId};
}