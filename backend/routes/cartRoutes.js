import express from 'express';
import {
    getCart,
    addToCart,
    updateCartItem,
     removeFromCart,
} from '../controllers/cartControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart);

 router
    .route('/:productId')
    .put(protect, updateCartItem)
   .delete(protect, removeFromCart);

export default router;
