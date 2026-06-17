import express from "express";
import loginRouter from "./src/routes/auth.route";
import { expenseRouter } from "./src/routes/expense.route"; 1
import dotenv from 'dotenv';
import cors from "cors";
const app = express();
dotenv.config();
app.use(cors({
    origin: ['http://localhost:4200', 'https://expense-tracker-backend-czzz.onrender.com'],
    credentials: true
}))
app.use(express.json());
app.get('/healthcheck', (req, res) => {
    console.log("welcome to expense healthcheck");
    return res.send({ message: "welcome to expense healthcheck" });
});
app.get('/expense/healthcheck', (req, res) => {
    console.log('Expense Health Good :)');
    res.status(200).send({ message: 'Expense Health Good' });
})
app.use('/api/auth', loginRouter);
app.use('/api/expense', expenseRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening PORT:::', port);
})