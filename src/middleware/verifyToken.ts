import jwt from "jsonwebtoken";
import { AuthRequest, IUserToken } from "../types/userTypes";
import { NextFunction, Request, Response } from "express";
export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    // const token: String = req.headers["authorization"] || '';
    const token: string = req.headers.token as string;
    if (!token) {
        res.status(401).json({ status: "error", message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token || '', process.env.JWT_SECRET || '');
        req.userDetails = decoded as IUserToken;
        next();

    } catch (error) {
        return res.status(403).json({ status: "error", message: "Invalid or expired token" });
    }
}
export default verifyToken;