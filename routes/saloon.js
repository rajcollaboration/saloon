import express from 'express';
import { register,createShop,login, logout,review, createProduct, booking, getAllReviews, editReview, getShop, updateShop, deleteShop } from '../controllers/user/saloon.js';
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
router.patch('/edit-reviews/:reviewId',verifyToken,editReview);
router.get('/get-shop/:shopId',verifyToken,getShop);
router.patch('/update-shop/:shopId',verifyToken,updateShop);
router.delete('/delete-shop/:shopId',verifyToken,deleteShop);


export default router;
