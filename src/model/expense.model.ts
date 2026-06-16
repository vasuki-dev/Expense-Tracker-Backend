import mongoose from "mongoose";
const expenseListSchema = new mongoose.Schema({
    userCode: String
});

const expenseModel = mongoose.model("expense",expenseListSchema);
export {expenseModel};