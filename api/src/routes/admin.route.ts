import { Router } from 'express'
import adminController from '../controllers/admin.controller';
import multer from 'multer'
import { uploadMiddleware } from '../middlewares/upload.middleware';

const upload = multer({ dest: 'uploads/'})

const router = Router();

router
    // Listing Routes
    .get('/examples', adminController.getExamples)
    .get('/tests', adminController.getTests)
    .get('/videos', adminController.getVideos)
    .get('/books', adminController.getBooks)
    
    // Getting by id Routes
    .get('/examples/:id', adminController.getExampleById)
    .get('/tests/:id', adminController.getTestById)
    .get('/videos/:id', adminController.getVideoById)
    .get('/books/:id', adminController.getBookById)

    // Creating Routes
    .post('/examples', adminController.createExample)
    .post('/tests', adminController.createTest)
    .post('/videos',
        upload.fields([ { name: 'videoFile', maxCount: 1 } ]),
        uploadMiddleware([ { name: 'videoFile', isArray: false } ]),
        adminController.createVideo)
    .post('/books',
        upload.fields([ { name: 'cover', maxCount: 1 } ]),
        uploadMiddleware([ { name: 'cover', isArray: false } ]),
        adminController.createBook)
    
    // Updating Routes
    .patch('/examples/:id', adminController.updateExample)
    .patch('/tests/:id', adminController.updateTest)
    .patch('/videos/:id',
        upload.fields([ { name: 'videoFile', maxCount: 1 } ]),
        uploadMiddleware([ { name: 'videoFile', isArray: false } ]),
        adminController.updateVideo)
    .patch('/books/:id',
        upload.fields([ { name: 'cover',maxCount: 1 } ]),
        uploadMiddleware([ { name: 'cover', isArray: false } ]),
        adminController.updateBook)
    
    // Switch Visibility Routes
    .patch('/examples/:id/publish/:visibility', adminController.switchExampleVisibility)
    .patch('/tests/:id/publish/:visibility', adminController.switchTestVisibility)
    .patch('/videos/:id/publish/:visibility', adminController.switchVideoVisibility)
    .patch('/books/:id/publish/:visibility', adminController.switchBookVisibility)


    // Deletion Routes
    .delete('/examples/:id', adminController.deleteExample)
    .delete('/tests/:id', adminController.deleteTest)
    .delete('/videos/:id', adminController.deleteVideo)
    .delete('/books/:id', adminController.deleteBook)

export default router