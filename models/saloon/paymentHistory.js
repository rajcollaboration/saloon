import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: "Apointment",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    purposes: {
        type: String,
        required: true,
    },

},{timestamps: true});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;