import { Request, Response, NextFunction } from "express"
import authService from "../services/auth.service";
import { UserPayload } from "../interfaces/user-payload.interface";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";

namespace Express {
    interface Request {
        user: UserPayload
    }
}

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]
    
        if (token == null) {
            next(new UnauthorizedException())
        }
        const payload = authService.verifyToken(token)
        req.user = payload
        next()

    } catch (error) {
        next(error)
    }
}