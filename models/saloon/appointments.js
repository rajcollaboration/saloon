import mongoose from "mongoose";

const appointmentScheema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    appointmentDate:{
        type: String,
        required: true,
    },
    appointmentTime:{
        type: String,
        required: true,
    },
    appointmentStatus:{
        type: String,
        required: true,
        default: "Pending"
    },
    appointmentEndDate:{
        type: String,
        required: true,
        default: Date.now
    },
    appointmentEndTime:{
        type: String,
        required: true,
        default: Date.now
    },
    appointmentPrice:{
        type: Number,
        required: true,
    },
    shopId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Shop"
    },

},{timestamps:true});

const Appointment = mongoose.model("Appointment", appointmentScheema);
export default Appointment;