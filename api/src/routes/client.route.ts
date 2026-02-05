import { Router } from 'express'
import clientController from '../controllers/client.controller';

const router = Router();

router
    .get('/examples', clientController.getExamples)
    .get('/tests', clientController.getTests)
    .get('/videos', clientController.getVideos)
    .get('/books', clientController.getBooks)

export default router