import { Router } from 'express'
import clientRouter from './client.route'

const router = Router()

router.use('/client', clientRouter)

export default router