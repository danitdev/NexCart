import {Router} from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { checkoutCartToOrder, getOrders } from "./orderController.js";


const router = Router();

router.post("/checkout",isAuth,checkoutCartToOrder);
router.get("/",getOrders);

export default router;