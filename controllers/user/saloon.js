import bcrypt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';
import saloonAccount from '../../models/saloon/saloonAccount.js';
import { createError } from '../../error.js';
import Shop from '../../models/saloon/shop.js';
import users from '../../models/users/users.js';
import Reviews from '../../models/saloon/reviews.js';
import Product from '../../models/saloon/product.js';
import Appointment from '../../models/saloon/appointments.js';


// seloon registration controller

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await saloonAccount.findOne({ email });
        if (user) {
            return next(createError( 409 , "user already exists"));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newSaloon = new saloonAccount({
            ...req.body,
            password: hashedPassword,
           
        });
        const savedUser = await newSaloon.save();
        res.status(201).json({message: 'shop created successfully', staus: 'success'});
    } catch (error) {
        next(error);
    }
}

// seloon login controller

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await saloonAccount.findOne({ email });
        if (!user) {
            return next(createError( 401, "invalid credentials"));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(createError( 401, "invalid credentials"));
        }
        const token = Jwt.sign({ _id: user._id }, process.env.TOKENSECRET, { expiresIn: '1h' });
        res.status(200).json({message: 'logged in successfully', status:'success', token});
    } catch (error) {
        next(error);
    }
}

// seloon logout controller

export const logout = async (req, res, next) => {
    try {
        res.status(200).json({message: 'logged out successfully', status:'success'});
    } catch (error) {
        next(error);
    }
}

// create shop

export const createShop = async (req, res, next) => {
    console.log("ok");
    try {
        const { shopEmail } = req.body;
        const user = await Shop.findOne({ shopEmail });
        if (user) {
            return next(createError( 409, "shop already exists"));
        }
        const newSaloon = new Shop({
            ...req.body,
        });
        const savedUser = await newSaloon.save();
        res.status(201).json({message:'shop created successfully', status:'success'});
    } catch (error) {
        next(error);
    }
}



// get all shops

export const getAllShops = async (req, res, next) => {
    try {
        const shops = await Shop.find();
        res.status(200).json({message:'shops fetched successfully', status:'success', shops});
    } catch (error) {
        next(error);
    }
}

// review the shop and product

export const review = async (req, res, next) => {
    try {
        const { shopId, userId } = req.body;
        
        const shop = await Shop.findOne({ _id:shopId });
        if (!shop) {
            return next(createError( 401, "invalid shopid"));
        }

        const user = await users.findOne({ _id:userId });
        if (!user) {
            return next(createError( 401, "invalid userid"));
        }
        const review = await Reviews.create({...req.body });
        res.status(201).json({message:'review created successfully', status:'success'});
    } catch (error) {
        next(error);
    }
}

// get all reviews of shop

export const getAllReviews = async (req, res, next) => {
    const {shopId} = req.body;
    try {
        const reviews = await Reviews.find({shopId});
        if (reviews.length === 0) {
            return res.status(404).json({message: 'No reviews found', status: 'Not Found'});
        }
        res.status(200).json({message:'reviews fetched successfully', status:'success', reviews});
    } catch (error) {
        next(error);
    }
}

// edit review

export const editReview = async (req, res, next) => {
    try {
        const { shopId, reviewId, userId } = req.body;
        
        const shop = await Shop.findOne({ _id:shopId });
        
        const review = await Reviews.findOne({ _id:reviewId, userId: userId , shopId: shopId });
        if (!review) {
            return next(createError( 401, "invalid reviewid"));
        }
        const updatedReview = await review.updateOne({...req.body });
        res.status(201).json({message:'review updated successfully', status:'success'});
    } catch (error) {
        next(error);
    }
}


// create product for saloon

export const createProduct = async (req, res, next) => {
    try {
        const { shopid } = req.body;
        
        const shop = await Shop.findOne({ _id:shopid });
        if (!shop) {
            return next(createError( 401, "invalid shopid"));
        }
        const newSaloon = new Product({
          ...req.body,
        });
        const savedUser = await newSaloon.save();
        res.status(201).json({message: 'product created successfully', status:'success'});
    } catch (error) {
        next(error);
    }
}

// booking of saloon appointment or product

export const booking = async (req, res, next) => {
    try {
        const { shopId, userId, date, time } = req.body;
        const shop = await Shop.findOne({ _id:shopId });
        if (!shop) {
            return next(createError( 401, "invalid shopid"));
        }

        const user = await users.findOne({ _id:userId });
        if (!user) {
            return next(createError( 401, "invalid userid"));
        }

        const isBooked = await Appointment.findOne({ userId:userId, shopId, date,time});
        console.log(isBooked);
        if (isBooked) {
                    return next(createError( 409, "This slot already booked"));
                }
        const booking = await Appointment.create({...req.body });
        res.status(201).json({message: 'Sit booking created successfully', status:'success'});
    } catch (error) {
        next(error);
    }
}
