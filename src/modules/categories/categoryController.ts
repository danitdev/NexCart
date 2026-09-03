import {Request,Response,NextFunction} from "express";

import {getCategoriesService,postCategoryService} from "./categoryService.js";



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

export const postCategory = async(
        req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const name = req.body.name;
            const category = await postCategoryService(name);
            res.json({category:category,msg:"the category is created!"});
        }catch(err){
            next(err);
        }


}
