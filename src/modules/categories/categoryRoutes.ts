import {Router} from "express";
import {getCategories, getCategory, postCategory} from "./categoryController.js";

const router = Router();

router.get("/",getCategories);
router.get("/:id",getCategory);
router.post("/",postCategory);
// router.patch("/:id",)
// router.delete("/:id");


export default router;