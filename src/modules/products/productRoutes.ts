import {Router} from "express";
import {deleteProduct, getProcuts, getProcutsAvailable, getProduct, patchProduct, postProduct} from "./productController.js";
import {createProductSchema, updateProductSchema} from "./productSchema.js";
import {validate} from "../../middlewares/validate.js";
import {isAuth} from "../../middlewares/isAuth.js";
import {isAdmin} from "../../middlewares/isAdmin.js";

const router = Router();

router.get("/",getProcuts);
//returns product with more than 0 stock
router.get("/available",getProcutsAvailable);
router.get("/:id",getProduct);
router.post("/",isAuth,isAdmin,validate(createProductSchema),postProduct);
router.patch("/:id",isAuth,isAdmin,validate(updateProductSchema),patchProduct);
router.delete("/:id",isAuth,isAdmin,deleteProduct);

export default router;