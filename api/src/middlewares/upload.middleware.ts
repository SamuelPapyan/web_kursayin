import { Request, Response, NextFunction } from 'express'
import 'multer'
import fs from 'fs'
import { MimeType } from '../enums/file-type.enum';
import { ValidationException } from '../exceptions/validation.exception';

interface FileField {
    name: string;
    isArray: boolean;
    mimeType: MimeType;
    required?: boolean;
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
                const {name, isArray, mimeType, required} = file;
                if (isArray) {
                    if (required && (!req.files[name] || !req.files[name].length))
                        throw new ValidationException([{property: name, message: `${name} is required.`}])
                    if (req.files[name] && req.files[name].length) {
                        req.files[name].forEach((f, i) => {
                            if (!f.mimetype.includes(mimeType))
                                throw new ValidationException([{property: name, message: `File must be ${mimeType}`}])
                            const fileBuffer = fs.readFileSync(f.path);
                            const base64 = fileBuffer.toString('base64');
                            const dataUri = `data:${f.mimetype};base64,${base64}`;
                            req.encodedFiles.set(`${name}[${i}]`, dataUri)
                            fs.unlinkSync(f.path as string)
                        });
                    }
                } else {
                    if (required && (!req.files[name] || !req.files[name][0]))
                        throw new ValidationException([{property: name, message: `${name} is required.`}])
                    if (req.files[name] && req.files[name][0]) {
                        if (!req.files[name][0].mimetype.includes(mimeType))
                            throw new ValidationException([{property: name, message: `File must be ${mimeType}`}])
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