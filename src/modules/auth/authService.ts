import {prisma} from "../../lib/prisma.js";
import {AppError} from "../../errors/AppError.js";
import {Prisma} from "../../generated/prisma/client.js";
import {CreateUserInput,LoginUserInput} from "./authSchema.js";
import argon2 from "argon2";
import {generateToken} from "../../utils/auth.js";
import { generateResetToken } from "../../utils/resetToken.js";
import crypto from "node:crypto"


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
            name: data.name,
            cart:{
                create:{}
            }
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
    token = generateToken(userId,loadedUser.email);
    //returning token and user id
    return {token,userId};
}

export const forgotPasswordService = async(email:string)=>{
    
    const user = await prisma.user.findUnique({
        where:{email}
    });
    if(!user){
        throw new AppError("User not found",404);
    }
    const {token , hashedToken} = generateResetToken();
    await prisma.user.update({
        where:{
            id:user.id
        },
        data:{
            passwordResetToken: hashedToken,
            passwordResetExpiresAt: new Date(
                Date.now()+15*60*1000
            )
        }
    });
    let url = "http://localhost:8080/auth/reset-password?token"+token;
    return{
        message:"If the email exists, a reset token has been generated.",
        url,
        token
    }

}

export const resetPasswordService = async(token:string,newPass:string)=>{
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await prisma.user.findFirst({
        where:{
            passwordResetToken:hashedToken,
            passwordResetExpiresAt:{
                gt:new Date()
            }
        }
    });
    if(!user){
        throw new AppError("Invalid or expired token.",401);
    }
    const hashedPass = await argon2.hash(newPass,{type: argon2.argon2id,memoryCost: 65536,timeCost:3,parallelism:4});
    await prisma.user.update({
        where:{
            id:user.id
        },
        data:{
            password:hashedPass,
            passwordResetExpiresAt:null,
            passwordResetToken:null
        }
    });
    return {
    message: "Password reset successfully."
    };
}