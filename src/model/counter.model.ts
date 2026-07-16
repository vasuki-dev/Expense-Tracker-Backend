import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    _id: String,
    seq: {
        type: Number,
        default: 0
    }
});

export const counterModel = mongoose.model("Counter", counterSchema,'counter');