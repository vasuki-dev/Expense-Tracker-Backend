import { Request, response, Response } from "express";
import { expenseModel } from "../model/expense.model";
export class expenseService {
    expenseList = async (req: Request, res: Response) => {
        const { userCode } = req?.body;
        const result: any = await expenseModel.findOne({ userCode });
        if (result?.length) {
            return res.status(500).json({ status: "error", message: "Something went wrong in expense list" });
        }
        return res.status(200).json({ status: "ok", response: result });

    }
}
const expenseservice = new expenseService();
export default expenseservice;