import express from "express";
import logincontroller from "../controllers/login.controller";
const loginRouter = express.Router();

loginRouter.post('/login', logincontroller.login);
loginRouter.post('/signup', logincontroller.newUser);
loginRouter.post('/refreshtoken', logincontroller.refreshToken);

export default loginRouter;