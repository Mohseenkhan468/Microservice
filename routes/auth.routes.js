import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router=Router()
router.post('/auth/register',AuthController.register)
router.post('/auth/login',AuthController.login)
router.get('/auth/profile',authMiddleware,AuthController.getProfile)
export default router;