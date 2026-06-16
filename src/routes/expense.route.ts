import { Router } from "express";
import { dbConnect } from "../config/dbConfig";
import verifyToken from "../middleware/verifyToken";
import expensecontroller from "../controllers/expense.controller";
const expenseRouter = Router();

expenseRouter.get('/list', verifyToken, dbConnect, expensecontroller.getExpenseList);

export { expenseRouter }