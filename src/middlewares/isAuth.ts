import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { AppError } from "../errors/AppError.js";

interface AuthTokenPayload extends JwtPayload {
    userId: number;
    email: string;
}



export const isAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return next(
            new AppError("Authentication required.", 401)
        );
    }
    const [scheme,token] = authHeader.split(" ");
    if (scheme !== "Bearer" ||!token) {
        return next(
            new AppError("Invalid authorization header.", 401)
        );
    }
    try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as AuthTokenPayload;
        req.userId = decodedToken.userId;
        next();
    } catch (err) {
        return next(
            new AppError("Invalid or expired token.", 401)
        );
    }
};