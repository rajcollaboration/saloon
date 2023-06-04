import express from "express";
import mongoose from "mongoose";


const reviewsScheema = new mongoose.Schema({

    rating: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: false,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Shop"
    },
    
   
},{timestamps:true});

const Reviews = mongoose.model("Reviews",reviewsScheema);
export default Reviews;