import { body } from "express-validator"

export const bookValidator = [
    body('title')
        .exists().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .isLength({ min: 1, max: 150 }).withMessage('Title length must be at least 1 and under 150 symbols'),
    
    body('link')
        .exists().withMessage('Link is required')
        .isString().withMessage('Link must be a string')
        .isURL().withMessage('Link must be a valid url.')
]