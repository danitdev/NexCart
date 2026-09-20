import {Request,Response,NextFunction} from "express";
import {ZodType} from "zod";
import {AppError} from "../errors/AppError.js"


export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.flatten();

            const message = Object.values(errors.fieldErrors)
                .flat()
                .filter((error): error is string => error !== undefined)[0];

            console.log(errors);

            throw new AppError(
                message ?? "Validation failed.",
                422
            );
        }

        req.body = result.data;
        next();
    };
};
export const validateQuery = (schema: ZodType)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const result = schema.safeParse(req.query);
        if(!result.success){
            const errors = result.error.flatten();
            const message = Object.values(errors.fieldErrors)
                .flat()
                .filter((error):error is string => error !== undefined)[0];
            console.log(errors);
            throw new AppError(message ?? "Validation failed.",422);
        }
        Object.assign(req.query,result.data);
        next();

    }
}