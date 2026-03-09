import express from 'express'
const router = express.Router()
import { protect } from '../middlewares/authMiddleware.js'
import { getOrders, createOrder,getOrderById } from '../controllers/orderControllers.js'

router.route('/')
    .get(protect, getOrders)
    .post(protect, createOrder);
router.route("/:id")
  .get(protect, getOrderById);
export default router;
