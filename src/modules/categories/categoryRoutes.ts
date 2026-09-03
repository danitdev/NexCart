import {Router} from "express";
import {deleteCategory, getCategories, getCategory, postCategory, updateCategory} from "./categoryController.js";

const router = Router();

router.get("/",getCategories);
router.get("/:id",getCategory);
router.post("/",postCategory);
router.patch("/:id",updateCategory);
router.delete("/:id",deleteCategory);


export default router;