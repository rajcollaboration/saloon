import express from "express";
import mongoose from "mongoose";


const sallonScheema = new mongoose.Schema({

    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{type:String, required: true},
    password:{
        type:String,
        required:true
    },
    accountOpenDate:{
        type:Date,
        default:Date.now(),
    },
    accountCloseDate:{
        type:Date,
    },
    role:{
        type:String,
        required:true,
        default:"saloon",
    },
    isActive:{
        type:Boolean,
        required:true,
        default:false
    },
    
   
},{timestamps:true});

export default mongoose.model('Saloon',sallonScheema);