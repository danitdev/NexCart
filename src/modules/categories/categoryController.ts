import {Request,Response,NextFunction} from "express";

import {getCategoriesService} from "./categoryService.js";



export const getCategories = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{

            const categories = await getCategoriesService();
            res.json({categories:categories});
        }catch(err){
            next(err);
        }

}