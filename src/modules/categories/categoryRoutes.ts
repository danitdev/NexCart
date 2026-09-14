import {Router} from "express";
import {deleteCategory, getCategories, getCategoryProducts, postCategory, updateCategory} from "./categoryController.js";
import {isAuth} from "../../middlewares/isAuth.js";
import {isAdmin} from "../../middlewares/isAdmin.js";
const router = Router();

router.get("/",getCategories);
router.get("/:id/products",getCategoryProducts);
router.post("/",isAuth,isAdmin,isAuth,postCategory);
router.patch("/:id",isAuth,isAdmin,isAuth,updateCategory);
router.delete("/:id",isAuth,isAdmin,isAuth,deleteCategory);


export default router;