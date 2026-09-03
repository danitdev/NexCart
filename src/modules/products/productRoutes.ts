import {Router} from "express";
import {getProcuts, getProduct} from "./productController.js";
const router = Router();

router.get("/",getProcuts);
router.get("/:id",getProduct);

export default router;