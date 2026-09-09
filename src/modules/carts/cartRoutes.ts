import {Router} from "express";
import {validate} from "../../middlewares/validate.js";
import { addToCart, getCart, updateCart } from "./cartController.js";
import {isAdmin} from "../../middlewares/isAdmin.js";
import {isAuth} from "../../middlewares/isAuth.js";
const router = Router();

router.get("/",isAuth,getCart);
router.post("/items",isAuth,addToCart);
router.patch("/items/:itemId",isAuth,updateCart);

export default router;