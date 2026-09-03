import {Router} from "express";
import {getCategories, postCategory} from "./categoryController.js";

const router = Router();

router.get("/",getCategories);
router.get("/:id",);
router.post("/",postCategory);
// router.patch("/:id",)
// router.delete("/:id");


export default router;