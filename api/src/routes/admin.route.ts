import { Router } from 'express'
import adminController from '../controllers/admin.controller';

const router = Router();

router
    .get('/examples', adminController.getExamples)
    .get('/tests', adminController.getTests)
    .get('/videos', adminController.getVideos)
    .get('/books', adminController.getBooks)

    .post('/examples', adminController.createExample)
    .post('/tests', adminController.createTest)
    .post('/videos', adminController.createVideo)
    .post('/books', adminController.createBook)
    
    .patch('/examples', adminController.updateExample)
    .patch('/tests', adminController.updateTest)
    .patch('/videos', adminController.updateVideo)
    .patch('/books', adminController.updateBook)
    
    .delete('/examples', adminController.deleteExample)
    .delete('/tests', adminController.deleteTest)
    .delete('/videos', adminController.deleteVideo)
    .delete('/books', adminController.deleteBook)

export default router