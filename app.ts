import express from "express";
import loginRouter from "./src/routes/auth.route";
import { expenseRouter } from "./src/routes/expense.route"; 1
import dotenv from 'dotenv';
import cors from "cors";
import { connectDB } from "./src/utils/db";
const app = express();
dotenv.config();
app.use(cors({
    origin: ['http://localhost:4200', 'https://vasuki-expense-tracker.vercel.app'],
    credentials: true
}))
app.use(express.json());
// Connect only once
connectDB();
app.get('/expense/healthcheck', (req, res) => {
    console.log("welcome to expense healthcheck");
    return res.send({ message: "welcome to expense healthcheck" });
});

app.use('/api/auth', loginRouter);
app.use('/api/expense', expenseRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening PORT:::', port);
})