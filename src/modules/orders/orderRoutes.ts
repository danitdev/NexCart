import {Router} from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import {isAdmin} from "../../middlewares/isAdmin.js";
import { checkoutCartToOrder, getOrderById, getOrderByIdAdmin, getOrders, getOrdersAdmin, updateOrderStatusByAdmin } from "./orderController.js";
import {updateOrderStatusSchema} from "./orderSchema.js";
import {validate} from "../../middlewares/validate.js";


const router = Router();

router.post("/checkout",isAuth,checkoutCartToOrder);
router.get("/admin",isAuth,isAdmin,getOrdersAdmin);
router.patch("/admin/:id/status",isAuth,isAdmin,validate(updateOrderStatusSchema),updateOrderStatusByAdmin);
router.get("/admin/:id",isAuth,isAdmin,getOrderByIdAdmin);
router.get("/",isAuth,getOrders);
router.get("/:id",isAuth,getOrderById);


export default router;