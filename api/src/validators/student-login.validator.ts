import { body } from "express-validator";

export const studentLoginValidator = [
    body("email")
        .exists().withMessage("Email is required")
        .isString().withMessage("Email must be a string")
        .isEmail().withMessage("Email must be a valid email")
]

export const studentVerifyLoginValidator = [
    body("code")
        .exists().withMessage("Code is required")
        .isString().withMessage("Code must be a string")
        .isNumeric().withMessage("Code must be numeric")
        .isLength({min: 6, max: 6}).withMessage("Code must contain 6 digits")
]