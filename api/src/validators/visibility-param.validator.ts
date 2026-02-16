import { param } from "express-validator";
import { Visibility } from "../enums/visibility.enum";

export const visibilityParam = [
    param('visibility')
        .exists().withMessage('Visibility is required')
        .isString().withMessage('Visibility must be a string')
        .isIn([Visibility.PUBLISH, Visibility.UNPUBLISH])
            .withMessage(`Visibility values must be "${Visibility.PUBLISH}" or "${Visibility.UNPUBLISH}"`)
]