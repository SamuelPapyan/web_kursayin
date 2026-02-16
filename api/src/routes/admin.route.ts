import { Router } from 'express'
import adminController from '../controllers/admin.controller';
import multer from 'multer'
import { uploadMiddleware } from '../middlewares/upload.middleware';
import { idRequired } from '../validators/id-required.validator';
import { visibilityParam } from '../validators/visibility-param.validator';
import { validateRequest } from '../middlewares/validate-request.middleware';
import { exampleValidator } from '../validators/example.validator';
import { testValidator } from '../validators/test.validator';
import { videoValidator } from '../validators/video.validator';
import { bookValidator } from '../validators/book.validator';
import { MimeType } from '../enums/file-type.enum';

const upload = multer({ dest: 'uploads/'})

const router = Router();

router
    // Listing Routes
    .get('/examples', adminController.getExamples)
    .get('/tests', adminController.getTests)
    .get('/videos', adminController.getVideos)
    .get('/books', adminController.getBooks)
    
    // Getting by id Routes
    .get('/examples/:id', [...idRequired], validateRequest, adminController.getExampleById)
    .get('/tests/:id', [...idRequired], validateRequest, adminController.getTestById)
    .get('/videos/:id', [...idRequired], validateRequest, adminController.getVideoById)
    .get('/books/:id', [...idRequired], validateRequest, adminController.getBookById)

    // Creating Routes
    .post('/examples', [...exampleValidator], validateRequest, adminController.createExample)
    .post('/tests', [...testValidator], validateRequest, adminController.createTest)
    .post('/videos',
        upload.fields([ { name: 'videoFile', maxCount: 1 } ]),
        uploadMiddleware([ { name: 'videoFile', isArray: false, mimeType: MimeType.VIDEO } ]),
        [...videoValidator],
        validateRequest,
        adminController.createVideo)
    .post('/books',
        upload.fields([ { name: 'cover', maxCount: 1 } ]),
        uploadMiddleware([ { name: 'cover', isArray: false, mimeType: MimeType.IMAGE, required: true } ]),
        [...bookValidator],
        validateRequest,
        adminController.createBook)
    
    // Updating Routes
    .patch('/examples/:id', [...idRequired, ...exampleValidator], validateRequest, adminController.updateExample)
    .patch('/tests/:id', [...idRequired, ...testValidator], validateRequest, adminController.updateTest)
    .patch('/videos/:id',
        upload.fields([ { name: 'videoFile', maxCount: 1 } ]),
        uploadMiddleware([ { name: 'videoFile', isArray: false, mimeType: MimeType.VIDEO } ]),
        [...idRequired, ...videoValidator], 
        validateRequest,
        adminController.updateVideo)
    .patch('/books/:id',
        upload.fields([ { name: 'cover',maxCount: 1 } ]),
        uploadMiddleware([ { name: 'cover', isArray: false, mimeType: MimeType.IMAGE} ]),
        [...idRequired, ...bookValidator], 
        validateRequest,
        adminController.updateBook)
    
    // Switch Visibility Routes
    .patch('/examples/:id/publish/:visibility', [...idRequired, ...visibilityParam], validateRequest, adminController.switchExampleVisibility)
    .patch('/tests/:id/publish/:visibility', [...idRequired, ...visibilityParam], validateRequest, adminController.switchTestVisibility)
    .patch('/videos/:id/publish/:visibility', [...idRequired, ...visibilityParam], validateRequest, adminController.switchVideoVisibility)
    .patch('/books/:id/publish/:visibility', [...idRequired, ...visibilityParam], validateRequest, adminController.switchBookVisibility)


    // Deletion Routes
    .delete('/examples/:id', [...idRequired], validateRequest, adminController.deleteExample)
    .delete('/tests/:id', [...idRequired], validateRequest, adminController.deleteTest)
    .delete('/videos/:id', [...idRequired], validateRequest, adminController.deleteVideo)
    .delete('/books/:id', [...idRequired], validateRequest, adminController.deleteBook)

export default router