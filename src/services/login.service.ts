import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import JWTToken from "../utils/generateToken";
import { userModel } from "../model/user.model";

export class loginService {
    login = async (req: Request, res: Response) => {
        const { userName, password } = req?.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user: any = await userModel.findOne({ userName });
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        console.log(user, 'user data');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: "error", message: "Invalid password" });
        }
        let token = await JWTToken.generateToken(user);
        let refreshToken = await JWTToken.generateRefreshToken(user);
        //RefresToken store in the DB
        user.refreshToken = refreshToken;
        await user.save();
        return res.status(200).json({
            status: "ok", message: "Login working fine", token, refreshToken, userdetails: {
                userCode: user.userCode,
                role: user.role,
                userName: user.userName
            }
        });
    };
    createUser = async (req: Request, res: Response) => {
        console.log(req.body, '----------------> req body');
        const { userName, password, role } = req?.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            userName: userName,
            password: hashPassword,
            role: role
        });
        await user.save();
        console.log("user created.");
        return res.status(200).json({ status: "ok", message: "user created." });
    }
    refreshToken = async (req: Request, res: Response) => {
        let refreshtoken = req.body.refreshToken as string || "";
        if (!refreshtoken) {
            return res.status(401).send("No refresh token");
        }

        try {
            // ✅ verify refresh token
            const decoded: any = jwt.verify(
                refreshtoken,
                process.env.JWT_REFRESH_SECRET!
            );

            // ✅ check in DB (important)
            const user = await userModel.findOne({
                userCode: decoded.id
            });
            if (!user || user?.refreshToken !== refreshtoken) {
                return res.status(403).send("Invalid refresh token");
            }

            // ✅ generate new access token
            const newAccessToken = jwt.sign(
                { id: user._id, userName: user.userName },
                process.env.JWT_SECRET!,
                { expiresIn: "15m" }
            );

            res.json({ accessToken: newAccessToken });

        } catch (error) {
            return res.status(403).send("Token expired or invalid");
        }
    }
}
const loginservice = new loginService();
export default loginservice;