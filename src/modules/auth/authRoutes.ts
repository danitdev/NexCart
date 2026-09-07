import {Router} from "express";
import {validate} from "../../middlewares/validate.js";
import {createUserSchema, loginUserSchema} from "./authSchema.js";
import {login, signUp} from "./authController.js";

const router = Router();

router.post("/signup",validate(createUserSchema),signUp)
router.post("/login",validate(loginUserSchema),login);

export default router;