import { body } from 'express-validator'

export const adminUserValidator = [
    body('username')
        .exists().withMessage('Username is required')
        .isString().withMessage('Username must be a string')
        .isLength({min: 4}).withMessage("Username must be filled at least 4 symbols"),

    body('password')
        .exists().withMessage('Password is required.')
        .isString().withMessage('Password must be a string')
        .isLength({min: 4}).withMessage("Password must be filled at least 4 symbols")
]