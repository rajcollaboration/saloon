
import mongoose from "mongoose";


const orderScheema = new mongoose.Schema({

    userId:{
        type: String,
        required: true,
    },
    sallonId:{
        type: String,
        required: true,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity:{
        type: Number,
        required: true,
    },
    orderStatus:{
        type: String,
        required: true,
    },
    deliveryStatus:{
        type: String,
        default: "waiting",
        required: true,
    },
    deliveryTime:{
        type: Date,
    },
    
   
},{timeseries:true});

const orders = mongoose.model("Order", orderScheema);

export default orders;