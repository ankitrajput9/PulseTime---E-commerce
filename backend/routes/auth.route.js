import express from "express"
import { currentLoginUserController, googleAuthController, loginController, logoutController, registerController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = express.Router()

router.post("/register",registerController)
router.post("/login",loginController)
router.post("/logout/:userId",logoutController)
router.get("/current-user",authMiddleware,currentLoginUserController)

// Google Authenticate 

router.get("/google",passport.authenticate("google",{scope:["email","profile"]}))
router.get("/callback/google",passport.authenticate("google",{session:false}),googleAuthController)

// Forget passwpord

// router.post("/forget-password")

export default router ;