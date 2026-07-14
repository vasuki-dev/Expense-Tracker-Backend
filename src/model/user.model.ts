import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userCode: String,
    fullName: String,
    userName: String,
    email: String,
    mobile: Number,
    password: String,
    role: String,
    refreshToken: String
});

const userModel = mongoose.model("user", userSchema, "users");
export { userModel };