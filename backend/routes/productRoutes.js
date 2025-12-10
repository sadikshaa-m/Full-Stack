import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { checkfile, updateCheckfile } from '../middlewares/checkfile.js';
import { checkId } from '../middlewares/checkId.js';


const router = express.Router();

router.route('/api/products')
  .get(getProducts)
  //paila checkfile huncha ani createProduct ma balla proceed
  .post(checkfile, createProduct).all(notAllowed);

router.route('/api/products/:id')
  .get(checkId, getProduct)
  .patch(checkId, updateCheckfile, updateProduct)
  .delete(checkId, deleteProduct).all(notAllowed);



export default router;