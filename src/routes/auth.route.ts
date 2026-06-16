import express from "express";
import logincontroller from "../controllers/login.controller";
import { dbConnect } from "../config/dbConfig";
const loginRouter = express.Router();

loginRouter.post('/login', dbConnect, logincontroller.login);
loginRouter.post('/signup', dbConnect, logincontroller.newUser);
loginRouter.post('/refreshtoken', dbConnect, logincontroller.refreshToken);

export default loginRouter;