import { Router } from 'express'
import clientRouter from './client.route'
import adminRouter from './admin.route'

const router = Router()

router.use('/client', clientRouter)
router.use('/admin', adminRouter)

export default router