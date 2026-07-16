import mongoose from "mongoose";

export const connectDB = async () => {

    try {

        const password = encodeURIComponent("$admin46!");
        let url = `mongodb+srv://expenseadmin:${password}@cluster0.64rxymr.mongodb.net/?appName=Cluster0`;
        // let url = 'mongodb://localhost:27017/expense-tracker';
        await mongoose.connect(url);
        console.log("✅ MongoDB Connected");

    } catch (err) {

        console.log(err);

        process.exit(1);

    }

}