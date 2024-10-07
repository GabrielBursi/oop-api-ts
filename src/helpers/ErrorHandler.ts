import { Request, Response, NextFunction } from "express";

export class ErrorHandler {
    static notFound(_req: Request, res: Response, _next: NextFunction) {
        res.status(404).json({ message: "Resource not found" });
    }

    static serverError(
        error: Error,
        _req: Request,
        res: Response,
        _next: NextFunction
    ) {
        res.status(500).json({ message: error.message });
    }
}