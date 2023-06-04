import express from "express";
import mongoose from "mongoose";


const productScheema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
    },
    productCategory: {
        type: String,
        default:"",
        required: true,
    },
    shopid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Shop"
    },
    productStatus:{
        type: String,
        default:"Available",
        required: true
    },
   
},{timestamps:true});

const Product = mongoose.model("Product", productScheema);

export default Product;