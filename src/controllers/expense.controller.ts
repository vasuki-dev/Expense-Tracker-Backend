import { Request, Response } from "express";
import expenseservice from "../services/expense.service";
export class expenseController {
    getExpenseList = async (req: Request, res: Response) => {
        try {
            return await expenseservice.expenseList(req,res);
        }
        catch (error) {
            console.log(error, '------------> expense list error');
            res.status(500).json({ status: "error", message: "Expense List Error", error: error });
        }
    }
    getCategoryList = async (req: Request, res: Response) => {
        try {
            return await expenseservice.categoryList(req,res);
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Category List Error", error: error });
        }
    }
    addExpense = async (req: Request, res: Response) => {
        try {
            return await expenseservice.addExpense(req,res);
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Expense Add Error", error: error });
        }
    }
    updateExpense = async (req: Request, res: Response) => {
        try {
            return await expenseservice.updateExpense(req,res);
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Expense Update Error", error: error });
        }
    }
    deleteExpense = async (req: Request, res: Response) => {
        try {
            return await expenseservice.deleteExpense(req,res);
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Expense Delete Error", error: error });
        }
    }
}
const expensecontroller = new expenseController();
export default expensecontroller;