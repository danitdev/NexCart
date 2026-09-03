import {Router} from "express";
import {getProcuts} from "./productController.js";
const router = Router();

router.get("/",getProcuts);

export default router;