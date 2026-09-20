import {Router} from "express";
import {deleteProduct, getProcuts, getProduct, patchProduct, postProduct} from "./productController.js";
import {createProductSchema, productQuerySchema, updateProductSchema} from "./productSchema.js";
import {validate,validateQuery} from "../../middlewares/validate.js";
import {isAuth} from "../../middlewares/isAuth.js";
import {isAdmin} from "../../middlewares/isAdmin.js";

const router = Router();

router.get("/",validateQuery(productQuerySchema),getProcuts);
router.get("/:id",getProduct);
router.post("/",isAuth,isAdmin,validate(createProductSchema),postProduct);
router.patch("/:id",isAuth,isAdmin,validate(updateProductSchema),patchProduct);
router.delete("/:id",isAuth,isAdmin,deleteProduct);

export default router;