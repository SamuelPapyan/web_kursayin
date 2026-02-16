import { body } from "express-validator"

export const exampleValidator = [
    body('name')
        .exists().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 1, max: 150 }).withMessage('Title length must be at least 1 and under 150 symbols'),
    
    body('code')
        .exists().withMessage('Code is required')
        .isString().withMessage('Code must be a string')
]