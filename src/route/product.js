import express from 'express';
import { upload } from '../helpers/multer.js';
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from '../controller/product.js';

const router = express.Router()
router.post('/create', upload.single('image'), createProduct)
router.get('/all', getAllProducts)
router.get('/:productId', getProductById)
router.put('/update/:productId', upload.single('image'), updateProduct)
router.delete('/delete/:productId', deleteProductById)
export default router