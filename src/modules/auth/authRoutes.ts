import {Router} from "express";
import {validate} from "../../middlewares/validate.js";
import {createUserSchema, loginUserSchema} from "./authSchema.js";
import {forgotPassword, getMe, login, resetPassword, signUp} from "./authController.js";
import { isAuth } from "../../middlewares/isAuth.js";

const router = Router();

router.post("/signup",validate(createUserSchema),signUp)
router.post("/login",validate(loginUserSchema),login);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);
router.get("/me",isAuth,getMe);

export default router;