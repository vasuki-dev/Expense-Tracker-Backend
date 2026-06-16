import { Request } from "express";
export interface IUserToken {
    id: string
    userName: string
    passwrod: string
    role: string
}

export interface AuthRequest extends Request {
    userDetails?: IUserToken;
}