import mongoose from "mongoose";

const shopScheema = new mongoose.Schema({
    shopName:{
        type:String,
        required:true,
    },
    shopAddress:{
        type:[String],
        required:true,
    },
    shopPhone:{
        type:String,
        required:true,
    },
    shopEmail:{
        type:String,
        required:false,
    },
    shopWebsite:{
        type:String,
        required:false,
    },
    shopLogo:{
        type:String,
        required:false,
    },
    shopDescription:{
        type:String,
        required:false,
    },
    rating:{
        type:Number,
        required:false,
    },
    services:{
        type:[String],
        required:false,
    },
    accountId:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Saloon"
    }]
},{timestamps:true});

export default mongoose.model("Shop",shopScheema);


