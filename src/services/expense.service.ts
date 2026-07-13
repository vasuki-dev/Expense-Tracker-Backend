import { Request, response, Response } from "express";
import { expenseModel } from "../model/expense.model";
import { categoryModel } from "../model/category.model";
export class expenseService {
    expenseList = async (req: Request, res: Response) => {
        const userCode = req?.body?.userCode || null;
        // Descending (Newest → Oldest)
        const result: any = await expenseModel.find({
            user_code: userCode
        }).sort({ date: -1 });;

        console.log(result);
        if (!result?.length) {
            return res.status(500).json({ status: "error", message: "Something went wrong in expense list" });
        }
        return res.status(200).json({ status: "ok", response: result });

    }
    formatDate(date: string) {

        const d = new Date(date);

        const year = d.getFullYear();

        const month = String(
            d.getMonth() + 1
        ).padStart(2, '0');

        const day = String(
            d.getDate()
        ).padStart(2, '0');


        return `${year}-${month}-${day}`;

    }
    addExpense = async (req: any, res: Response) => {

        const {

            user_code,
            date,
            category,
            amount,
            note

        } = req.body;

        const expense = await expenseModel.create({

            user_code,

            date,

            category,

            amount,

            note,

            bill: (req?.file)
                ? req?.file?.path
                : ""

        });
        if (expense) {
            return res.status(201).json({

                status: "ok",

                message: "Expense added successfully."

            });
        }
        else {
            return res.status(500).json({ status: "error", message: "Something went wrong in expense add" });
        }



    }
    updateExpense = async (req: any, res: Response) => {


        const {

            _id,
            user_code,
            date,
            category,
            amount,
            note

        } = req.body;

        const updateData: any = {

            user_code,
            date,
            category,
            amount,
            note

        };

        if (req.file) {
            updateData.bill = req.file.path;
        }

        const result = await expenseModel.findByIdAndUpdate(

            _id,

            {
                $set: updateData
            },

            {
                returnDocument: 'after'
            }

        );

        if (!result) {

            return res.status(500).json({

                status: "error",
                message: "Something went wrong in expense update."

            });

        }

        return res.status(200).json({

            status: "ok",
            message: "Expense updated successfully.",
            response: result

        });

    }
    deleteExpense = async (req: Request, res: Response) => {
        const { _id } = req.body;

        if (!_id) {

            return res.status(400).json({
                status: "error",
                message: "Expense Id is required."
            });

        }

        const result = await expenseModel.findByIdAndDelete({_id});

        if (!result) {

            return res.status(500).json({
                status: "error",
                message: "Expense not found."
            });

        }

        return res.status(200).json({
            status: "ok",
            message: "Expense deleted successfully."
        });
    }
    categoryList = async (req: Request, res: Response) => {
        const result = await categoryModel.find({
            status: true
        });
        console.log(result);
        if (!result?.length) {
            return res.status(500).json({ status: "error", message: "Something went wrong in expense list" });
        }
        return res.status(200).json({ status: "ok", response: result });

    }
}
const expenseservice = new expenseService();
export default expenseservice;