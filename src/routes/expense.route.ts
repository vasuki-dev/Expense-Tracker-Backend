import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import expensecontroller from "../controllers/expense.controller";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

    destination(req:any, file:any, cb:any) {

        cb(null, "uploads/bills");

    },

    filename(req:any, file:any, cb:any) {

        cb(
            null,
            Date.now() +
            path.extname(file.originalname)
        );

    }

});

export const upload = multer({
    storage
});
const expenseRouter = Router();

expenseRouter.post('/list', verifyToken,  expensecontroller.getExpenseList);
expenseRouter.get('/categorylist', verifyToken,  expensecontroller.getCategoryList);
expenseRouter.post(
    "/add",
    upload.single("file"), verifyToken,  
    expensecontroller.addExpense
);

expenseRouter.post(
    "/update",
    upload.single("file"), verifyToken,  
    expensecontroller.updateExpense
);
expenseRouter.post('/delete', verifyToken,  expensecontroller.deleteExpense);
export { expenseRouter }