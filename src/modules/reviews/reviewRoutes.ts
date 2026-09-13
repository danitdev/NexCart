import {Router} from "express";
import {isAuth} from "../../middlewares/isAuth.js";
import {postReviewSchema} from "./reviewSchema.js";
import {validate} from "../../middlewares/validate.js";
import { postReview } from "./reviewController.js";

const router = Router();

router.post("/products/:id",isAuth,validate(postReviewSchema),postReview);
router.delete("/products/:id",isAuth,);
export default router;