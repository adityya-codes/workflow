import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secret") as { id: string };
        (req as any).userId = decodedToken.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}
