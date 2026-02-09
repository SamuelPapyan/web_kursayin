import { Request, Response, NextFunction } from 'express'

export const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Error", err.message);
    res.status(400).send({error: true})
}