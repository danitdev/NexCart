import {Router} from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { checkoutCartToOrder } from "./orderController.js";


const router = Router();

router.post("/checkout",isAuth,checkoutCartToOrder);

export default router;