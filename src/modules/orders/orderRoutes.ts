import {Router} from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { checkoutCartToOrder, getOrderById, getOrders } from "./orderController.js";


const router = Router();

router.post("/checkout",isAuth,checkoutCartToOrder);
router.get("/",getOrders);
router.get("/:id",getOrderById);

export default router;