import { Router } from 'express'
import clientController from '../controllers/client.controller';
import { studentLoginValidator, studentVerifyLoginValidator } from '../validators/student-login.validator';
import { validateRequest } from '../middlewares/validate-request.middleware';
import { studentAuth } from '../middlewares/student-auth.middleware';

const router = Router();
// Unauthorized routes
router
    .post('/login', [...studentLoginValidator], validateRequest, clientController.login)
    .post('/verify-login', [...studentVerifyLoginValidator], validateRequest, clientController.verifyLogin)

router.use(studentAuth)

// Authorized routes
router
    .get('/examples', clientController.getExamples)
    .get('/tests', clientController.getTests)
    .get('/videos', clientController.getVideos)
    .get('/books', clientController.getBooks)

export default router