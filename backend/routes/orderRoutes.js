import express from 'express'
const router = express.Router()
import { protect } from '../middlewares/authMiddleware.js'
import { getOrders, createOrder } from '../controllers/orderControllers.js'

router.route('/')
    .get(protect, getOrders)
    .post(protect, createOrder);

export default router;