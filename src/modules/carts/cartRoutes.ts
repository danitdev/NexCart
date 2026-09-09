import {Router} from "express";
import { addToCart, deleteItemFromCart, getCart, updateCart } from "./cartController.js";
import {isAuth} from "../../middlewares/isAuth.js";
const router = Router();

router.get("/",isAuth,getCart);
router.post("/items",isAuth,addToCart);
router.patch("/items/:itemId",isAuth,updateCart);
router.delete("/items/:itemId",isAuth,deleteItemFromCart);

export default router;