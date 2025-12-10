import express from 'express';
import { createOrder, getorder, getOrders } from '../controllers/orderController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { checkUser } from '../middlewares/checkUser.js';



const router = express.Router(); 

router.route('/api/orders').get(checkUser, getOrders).post(checkUser, createOrder).all(notAllowed);
router.route('/api/orders/:id').get(getorder).all(notAllowed);


export default router;