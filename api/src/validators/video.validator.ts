import { body } from "express-validator"

export const videoValidator = [
    body('title')
        .exists().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .isLength({ min: 1, max: 150 }).withMessage('Title length must be at least 1 and under 150 symbols'),
    
    body('youtubeId')
        .optional()
        .isString().withMessage('Youtube Id must be a string')
        .isLength({ min: 11, max: 11 }).withMessage('Youtube Id length must contain exact 11 symbols'),
    
    body('details')
        .exists().withMessage('Details is required')
        .isArray().withMessage('Details must be an array.'),

    body('details.*')
        .isObject().withMessage('Details element must be an object'),
    
    body('details.*.time')
        .exists().withMessage('Detail time is required')
        .isString().withMessage('Detail time must be a string')
        .matches(/^([0-9]{1,2}:)?[0-5][0-9]:[0-5][0-9]$/).withMessage('Detail time must be a valid time format (MM:SS or HH:MM:SS)'),
    
    body('details.*.content')
        .exists().withMessage('Detail content is required')
        .isString().withMessage('Detail content must be a string')
        
]