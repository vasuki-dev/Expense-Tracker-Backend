import mongoose from "mongoose";
import { Request, Response } from "express";
export const dbConnect = async (req: Request, res: Response, next: any) => {
    try {

        const password = encodeURIComponent("$admin46!");
        let url = `mongodb+srv://expenseadmin:${password}@cluster0.64rxymr.mongodb.net/?appName=Cluster0`;
        // let url = 'mongodb://localhost:27017/expense-tracker';
        await mongoose.connect(url);
        console.log("DB Connected.");
        next();
    }
    catch (error) {
        console.log("Db Error::: ", error);
        res.status(500).json({ status: 'error', message: "Db Error" });
    }
}