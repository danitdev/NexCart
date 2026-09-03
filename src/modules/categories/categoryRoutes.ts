import {Router} from "express";
import {getCategories} from "./categoryController.js";

const router = Router();

router.get("/",getCategories);

export default router;