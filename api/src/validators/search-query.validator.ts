import {query} from 'express-validator';

export const searchQueryValidator = [
    query('search')
        .optional()
        .isString().withMessage("search query must be a string")
]