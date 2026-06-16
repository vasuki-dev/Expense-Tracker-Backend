import express from "express";
import loginRouter from "./src/routes/auth.route";
import { expenseRouter } from "./src/routes/expense.route"; 1
import dotenv from 'dotenv';
import cors from "cors";
const app = express();
dotenv.config();
app.use(cors({
    origin: ['http://localhost:4200'],
    credentials:true
}))
const port = process.env.PORT || 3000;
app.use(express.json());
app.get('/healthcheck', (req, res) => {
    console.log("welcome to expense healthcheck");
    return res.send({ message: "welcome to expense healthcheck" });
});
app.use('/api/auth', loginRouter);
app.use('/api/expense', expenseRouter);
app.listen(port, () => {
    console.log('Listening PORT:::', port);
})