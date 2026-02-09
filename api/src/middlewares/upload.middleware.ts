import { Request, Response, NextFunction } from 'express'
import 'multer'
import fs from 'fs'

interface FileField {
    name: string;
    isArray: boolean;
}

declare global {
    namespace Express {
        interface Request {
            encodedFiles: Map<string, string>;
        }
    }
}

export const uploadMiddleware = (files: FileField[]) => {
    return (req: Request, res: Response, next: NextFunction)=>{
        try {
            if (!req.encodedFiles) req.encodedFiles = new Map<string, string>();
            files.forEach(file=>{
                const {name, isArray} = file;
                if (isArray) {
                    if (req.files[name] && req.files[name].length) {
                        req.files[name].forEach((f, i) => {
                            const fileBuffer = fs.readFileSync(f.path);
                            const base64 = fileBuffer.toString('base64');
                            const dataUri = `data:${f.mimetype};base64,${base64}`;
                            req.encodedFiles.set(`${name}[${i}]`, dataUri)
                            fs.unlinkSync(f.path as string)
                        });
                    }
                } else {
                    if (req.files[name] && req.files[name][0]) {
                        const fileBuffer = fs.readFileSync(req.files[name][0].path);
                        const base64 = fileBuffer.toString('base64');
                        const dataUri = `data:${req.files[name][0].mimetype};base64,${base64}`;
                        req.encodedFiles.set(name, dataUri);
                        fs.unlinkSync(req.files[name][0].path as string)
                    }
                }
            });
        } catch (error) {
            next(error);
        } finally {
            next();
        }
    }
};