import {Request,Response,NextFunction} from "express";
import {deleteCategoryService, getCategoriesService,getCategoryProductsService,postCategoryService, updateCategoryService} from "./categoryService.js";
import { AppError } from "../../errors/AppError.js";
import {parseId} from "../../utils/parseId.js";


export const getCategories = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{

            const categories = await getCategoriesService();
            res.status(200).json({categories:categories});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }

};

export const postCategory = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const name = req.body.name;
            const category = await postCategoryService(name);
            res.status(201).json({category:category,msg:"the category is created!"});
        }catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
};

export const getCategoryProducts = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const categoryId = parseId(req.params.id);
            const products = await getCategoryProductsService(categoryId);
            res.status(200).json({products,msg:"found the category!"});

        }
        catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
};

export const updateCategory = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const categoryId = parseId(req.params.id);
            const categoryUpdName = req.body.name;
            const updatedCategory = await updateCategoryService(categoryId,categoryUpdName);
            res.status(200).json({category:updatedCategory,msg:"updated the category!"});
        }
        catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
};

export const deleteCategory = async(
        req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const categoryId = parseId(req.params.id);
            await deleteCategoryService(categoryId);
            res.status(200).json({msg:"deleted the category!"});
        }
        catch(err){
            if(err instanceof AppError){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
            }
            next(err);
        }
};