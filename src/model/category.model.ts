import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    categoryCode: String,

    categoryName: String,

    categoryIcon: String,

    status: Boolean,
    createdAt: Date

});


const categoryModel = mongoose.model("Categories", categorySchema,"Category");
// console.log(categoryModel.collection.name,'----------------> collection Name');
export { categoryModel };