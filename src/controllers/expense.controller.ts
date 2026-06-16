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
}
const expensecontroller = new expenseController();
export default expensecontroller;