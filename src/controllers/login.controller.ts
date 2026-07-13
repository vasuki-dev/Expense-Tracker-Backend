import loginservice from "../services/login.service";
import { Request, Response } from "express";
export class loginController {
    newUser = async (req: Request, res: Response) => {
        try {
            return await loginservice.createUser(req, res);
        }
        catch (error) {
            console.log("New User Create error:::", error);
            res.status(500).json({ status: 'error', message: "Internal server error", error: error });
        }
    }
    login = async (req: Request, res: Response) => {
        try {
            return await loginservice.login(req, res);
        }
        catch (error) {
            console.log(error, '----------> login error');

            res.status(500).json({ status: 'error', message: "Internal server error", error: error });
        }
    }
    refreshToken = async (req: Request, res: Response) => {
        try {
            return await loginservice.refreshToken(req,res);

        } catch (error) {
            console.log(error, '----------------> error');
              return res.status(500).send(error);
        }
    }

}
const logincontroller = new loginController();
export default logincontroller;