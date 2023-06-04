import express from 'express';
import { register,createShop,login, logout,review, createProduct, booking, getAllReviews } from '../controllers/user/saloon.js';
import { verifyToken } from '../varifyToken.js';

const router = express.Router();

// Shop register routes

router.post('/register', register );
router.post('/create-shop', verifyToken , createShop );
router.post('/login', login );
router.post('/logout', logout);
router.post('/review', verifyToken, review );
router.post('/add-product',verifyToken, createProduct );
router.post('/booking',verifyToken, booking );
router.post('/get-reviews',verifyToken,getAllReviews);

export default router;
