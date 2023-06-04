import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        address: {
            type: [String],
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        registerDate: {
            type: Date,
            default: Date.now
        },
        role: {
            type: String,
            default: "user"
        },
        ProfileImage: {
            type: String,
            default: "https://i.pinimg.com/564x/3f/99/3f/3f993f355555555555555555555555555.jpg"
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
},{ timestamps: true });

export default mongoose.model("User", userSchema);