import { AppError } from "../errors/AppError.js";

export const parseId = (id:string|string[]):number=>{
    if(Array.isArray(id)){
        throw new AppError("Invalid ID",400);
    }
    const parseId = Number(id);
    if(!Number.isInteger(parseId) || parseId <=0){
        throw new AppError("Invalid ID",400);
    }
    return parseId;
}