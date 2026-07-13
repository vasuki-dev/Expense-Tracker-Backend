import mongoose from "mongoose";
const expenseListSchema = new mongoose.Schema({
    user_code: String,
    date: String,
    category: String,
    amount: Number,
    note: String,
    bill: String
});
// console.log(mongoose.connection.db,'----------> DB Name');
const expenseModel = mongoose.model("Expense", expenseListSchema,"expenses");
// console.log(expenseModel.collection.name,'----------------> collection Name');
export { expenseModel };