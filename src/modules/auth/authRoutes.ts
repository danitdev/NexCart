import {Router} from "express";
import {validate} from "../../middlewares/validate.js";
import {createUserSchema, loginUserSchema} from "./authSchema.js";
import {forgotPassword, login, resetPassword, signUp} from "./authController.js";

const router = Router();

router.post("/signup",validate(createUserSchema),signUp)
router.post("/login",validate(loginUserSchema),login);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);

export default router;