import { body } from "express-validator"

export const testValidator = [
    body('title')
        .exists().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .isLength({ min: 1, max: 150 }).withMessage('Title length must be at least 1 and under 150 symbols'),
    
    body('answer')
        .exists().withMessage('Answer is required')
        .isNumeric().withMessage('Answer must be a nunmber')
        .isIn([0, 1, 2]).withMessage('Answer must be in range of variants indexes'),
    
    body('variants')
        .exists().withMessage('Variants are required')
        .isArray({min: 3, max: 3}).withMessage('Variants must be an array of 3 elements'),

    body('variants.*')
        .exists().withMessage('Variant elements are required')
        .isString().withMessage('Variants element must be a string')
        .isLength({min: 1}).withMessage('Variants element must have least one symbol.'),

    body('themeLink')
        .exists().withMessage('Theme link is required')
        .isString().withMessage('Theme link must be a string')
        .isURL().withMessage('Theme link must be a valid url.')
]