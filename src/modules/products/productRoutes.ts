import {Router} from "express";
import {deleteProduct, getProcuts, getProduct, patchProduct, postProduct} from "./productController.js";
import {createProductSchema, updateProductSchema} from "./productSchema.js";
import {validate} from "../../middlewares/validate.js";
import de from "zod/v4/locales/de.cjs";

const router = Router();

router.get("/",getProcuts);
router.get("/:id",getProduct);
router.post("/",validate(createProductSchema),postProduct);
router.patch("/:id",validate(updateProductSchema),patchProduct);
router.delete("/:id",deleteProduct);

export default router;