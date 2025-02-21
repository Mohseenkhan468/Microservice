import { Router } from "express";
import AuthRoutes from './auth.routes.js'
import UserRoutes from './user.routes.js'
const router=Router()

router.use('/api',AuthRoutes)
router.use('/api',UserRoutes)
export default router