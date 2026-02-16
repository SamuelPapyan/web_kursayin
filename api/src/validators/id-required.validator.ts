import { param } from "express-validator";

export const idRequired = [
    param('id')
        .exists().withMessage('ID Param is required')
        .isString().withMessage('ID must be a string')
        .isMongoId().withMessage('ID must be a Mongo ID')
]