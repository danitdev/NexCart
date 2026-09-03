import {Request,Response,NextFunction} from "express";

import {getCategoriesService,getCategoryService,postCategoryService} from "./categoryService.js";
import ca from "zod/v4/locales/ca.cjs";



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

export const getCategory = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const categoryId = Number(req.params.id);
            const category = await getCategoryService(categoryId);
            res.json({category:category,msg:"found the category!"});

        }
        catch(err){

        }
}
