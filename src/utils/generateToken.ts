import jwt from "jsonwebtoken";
export class Token {
    generateToken = async (user: any) => {
        return jwt.sign({ id: user.userCode, userName: user.userName }, process.env.JWT_SECRET || '', { expiresIn: "15m" });
    }
    generateRefreshToken = async (user: any) => {
        return jwt.sign({ id: user?.userCode }, process.env.JWT_REFRESH_SECRET || '', { expiresIn: "1h" });
    }
}
const JWTToken = new Token();
export default JWTToken;

