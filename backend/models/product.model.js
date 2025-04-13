import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
    },
    img: {
        type: String,
        required: [true, "Please add an image URL"],
    }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
})