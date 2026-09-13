import {Router} from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import {isAdmin} from "../../middlewares/isAdmin.js";
import { checkoutCartToOrder, getOrderById, getOrders, updateOrderStatusByAdmin } from "./orderController.js";
import {updateOrderStatusSchema} from "./orderSchema.js";
import {validate} from "../../middlewares/validate.js";

const router = Router();

router.post("/checkout",isAuth,checkoutCartToOrder);
router.get("/",getOrders);
router.get("/:id",getOrderById);
// router.get("/admin",isAuth,isAdmin);
// router.get("/admin/:id",isAuth,isAdmin);
router.patch("/admin/:id/status",isAuth,isAdmin,validate(updateOrderStatusSchema),updateOrderStatusByAdmin);

export default router;