import {Router} from "express";
import {validate} from "../../middlewares/validate.js";
import {createUserSchema} from "./authSchema.js";

import {signUp} from "./authController.js";

const router = Router();

router.post("/signup",validate(createUserSchema),signUp)

export default router;