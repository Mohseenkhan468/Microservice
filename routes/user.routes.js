import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = Router();

router.get("/user/get_user/:id", UserController.getUser);

export default router;
