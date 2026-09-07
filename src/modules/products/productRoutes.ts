import {Router} from "express";
import {getProcuts, getProduct, patchProduct, postProduct} from "./productController.js";
import {createProductSchema} from "./productSchema.js";
import {validate} from "../../middlewares/validate.js";

const router = Router();

router.get("/",getProcuts);
router.get("/:id",getProduct);
router.post("/",validate(createProductSchema),postProduct);
router.patch("/:id",validate(createProductSchema),patchProduct);

export default router;