import express from 'express';
const router = express.Router();
import {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productControllers.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

router.route('/')
    .get(getProducts)
    .post(protect, adminOnly, upload.single('image'), createProduct);

router.route('/:id')
    .get(getProductById)
    .put(protect, adminOnly, upload.single('image'), updateProduct)
    .delete(protect, adminOnly, deleteProduct);

export default router;