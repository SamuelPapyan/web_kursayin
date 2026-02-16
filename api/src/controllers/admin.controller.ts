import { Request, Response, NextFunction } from 'express'
import adminService from '../services/admin.service'
import { Types } from 'mongoose'
import { IBook } from '../interfaces/book.interface'
import { Visibility } from '../enums/visibility.enum'
import { responseStatus } from '../enums/response.enum'
import responseService from '../services/response.service'
import { ResponseMessage } from '../enums/response-message.enum'
import { IAdmin } from '../interfaces/admin.interface'

class AdminController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body as unknown as IAdmin
            const examples = await adminService.login({ username, password })
            res.status(responseStatus.OK).send(responseService.createResponse(true, examples, ResponseMessage.ADMIN_LOGIN))
        } catch (error) {
            next(error)
        }
    }
    
    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            const examples = await adminService.getProfile(user)
            res.status(responseStatus.OK).send(responseService.createResponse(true, examples, ResponseMessage.ADMIN_PROFILE))
        } catch (error) {
            next(error)
        }
    }

    async getAdmins(req: Request, res: Response, next: NextFunction) {
        try {
            const examples = await adminService.getAdmins()
            res.status(responseStatus.OK).send(responseService.createResponse(true, examples, ResponseMessage.ADMIN_GET))
        } catch (error) {
            next(error)
        }
    }

    async getAdminById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const example = await adminService.getAdminById(new Types.ObjectId(id))
            res.status(responseStatus.OK).send(responseService.createResponse(true, example, ResponseMessage.ADMIN_GET_ID))
        } catch (error) {
            next(error)
        }
    }

    async createAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const example = await adminService.createAdmin(body)
            res.status(responseStatus.OK).send(responseService.createResponse(true, example, ResponseMessage.ADMIN_POST))
        } catch (error) {
            next(error)
        }
    }
    
    async updateAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { body } = req;
            const example = await adminService.updateAdmin(new Types.ObjectId(id), body)
            res.status(responseStatus.OK).send(responseService.createResponse(true, example, ResponseMessage.ADMIN_PATCH))
        } catch (error) {
            next(error)
        }
    }

    async deleteAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const example = await adminService.deleteAdmin(new Types.ObjectId(id))
            res.status(responseStatus.OK).send(responseService.createResponse(true, example, ResponseMessage.ADMIN_DELETE))
        } catch (error) {
            next(error)
        }
    }

    async getExamples(req: Request, res: Response, next: NextFunction) {
        try {
            const examples = await adminService.getExamples()
            res.status(responseStatus.OK).send(responseService.createResponse(true, examples, ResponseMessage.EXAMPLE_GET))
        } catch (error) {
            next(error)
        }
    }
    
    async getExampleById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const example = await adminService.getExampleById(new Types.ObjectId(id))
            res.status(responseStatus.OK).send(responseService.createResponse(true, example, ResponseMessage.EXAMPLE_GET_ID))
        } catch (error) {
            next(error)
        }
    }
    
    async createExample(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const example = await adminService.createExample(body)
            res.status(responseStatus.OK).send(responseService.createResponse(true, example, ResponseMessage.EXAMPLE_POST))
        } catch (error) {
            next(error)
        }
    }
    
    async updateExample(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { body } = req;
            const example = await adminService.updateExample(new Types.ObjectId(id), body)
            res.status(responseStatus.OK).send(responseService.createResponse(true, example, ResponseMessage.EXAMPLE_PATCH))
        } catch (error) {
            next(error)
        }
    }
    
    async switchExampleVisibility(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, visibility } = req.params;
            const example = await adminService.switchExampleVisibility(new Types.ObjectId(id), visibility as Visibility)
            res.status(responseStatus.OK).send(responseService.createResponse(true, example, ResponseMessage.EXAMPLE_VISIBILITY))
        } catch (error) {
            next(error)
        }
    }
    
    async deleteExample(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const example = await adminService.deleteExample(new Types.ObjectId(id))
            res.status(responseStatus.OK).send(responseService.createResponse(true, example, ResponseMessage.EXAMPLE_DELETE))
        } catch (error) {
            next(error)
        }
    }

    async getTests(req: Request, res: Response, next: NextFunction) {
        try {
            const tests = await adminService.getTests()
            res.status(responseStatus.OK).send(responseService.createResponse(true, tests, ResponseMessage.TEST_GET))
        } catch (error) {
            next(error)
        }
    }

    async getTestById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const test = await adminService.getTestById(new Types.ObjectId(id))
            res.status(responseStatus.OK).send(responseService.createResponse(true, test, ResponseMessage.TEST_GET_ID))
        } catch (error) {
            next(error)
        }
    }

    async createTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const test = await adminService.createTest(body)
            res.status(responseStatus.OK).send(responseService.createResponse(true, test, ResponseMessage.TEST_POST))
        } catch (error) {
            next(error)
        }
    }
    
    async updateTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { body } = req;
            const test = await adminService.updateTest(new Types.ObjectId(id), body)
            res.status(responseStatus.OK).send(responseService.createResponse(true, test, ResponseMessage.TEST_PATCH))
        } catch (error) {
            next(error)
        }
    }

    async switchTestVisibility(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, visibility } = req.params;
            const test = await adminService.switchTestVisibility(new Types.ObjectId(id), visibility as Visibility)
            res.status(responseStatus.OK).send(responseService.createResponse(true, test, ResponseMessage.TEST_VISIBILITY))
        } catch (error) {
            next(error)
        }
    }
    
    async deleteTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const test = await adminService.deleteTest(new Types.ObjectId(id))
            res.status(responseStatus.OK).send(responseService.createResponse(true, test, ResponseMessage.TEST_DELETE))
        } catch (error) {
            next(error)
        }
    }

    async getVideos(req: Request, res: Response, next: NextFunction) {
        try {
            const videos = await adminService.getVideos()
            res.status(responseStatus.OK).send(responseService.createResponse(true, videos, ResponseMessage.VIDEO_GET))
        } catch (error) {
            next(error)
        }
    }

    async getVideoById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const video = await adminService.getVideoById(new Types.ObjectId(id))
            res.status(responseStatus.OK).send(responseService.createResponse(true, video, ResponseMessage.VIDEO_GET_ID))
        } catch (error) {
            next(error)
        }
    }

    async createVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const file = req.encodedFiles.get('videoFile');
            const video = await adminService.createVideo(body, file)
            res.status(responseStatus.OK).send(responseService.createResponse(true, video, ResponseMessage.VIDEO_POST))
        } catch (error) {
            next(error)
        }
    }
    
    async updateVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { body } = req;
            const file = req.encodedFiles.get('videoFile');
            const video = await adminService.updateVideo(new Types.ObjectId(id), body, file)
            res.status(responseStatus.OK).send(responseService.createResponse(true, video, ResponseMessage.VIDEO_PATCH))
        } catch (error) {
            next(error)
        }
    }

    async switchVideoVisibility(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, visibility } = req.params;
            const video = await adminService.switchVideoVisibility(new Types.ObjectId(id), visibility as Visibility)
            res.status(responseStatus.OK).send(responseService.createResponse(true, video, ResponseMessage.VIDEO_VISIBILITY))
        } catch (error) {
            next(error)
        }
    }
    
    async deleteVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const video = await adminService.deleteVideo(new Types.ObjectId(id))
            res.status(responseStatus.OK).send(responseService.createResponse(true, video, ResponseMessage.VIDEO_DELETE))
        } catch (error) {
            next(error)
        }
    }

    async getBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const books = await adminService.getBooks()
            res.status(responseStatus.OK).send(responseService.createResponse(true, books, ResponseMessage.BOOK_GET))
        } catch (error) {
            next(error)
        }
    }

    async getBookById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const book = await adminService.getExampleById(new Types.ObjectId(id))
            res.status(responseStatus.OK).send(responseService.createResponse(true, book, ResponseMessage.BOOK_GET_ID))
        } catch (error) {
            next(error)
        }
    }

    async createBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, link } = req.body as IBook;
            const book = await adminService.createBook({title, link}, req.encodedFiles.get('cover'))
            res.status(responseStatus.OK).send(responseService.createResponse(true, book, ResponseMessage.BOOK_POST))
        } catch (error) {
            next(error)
        }
    }
    
    async updateBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { title, link } = req.body
            const book = await adminService.updateBook(new Types.ObjectId(id), {title, link}, req.encodedFiles.get('cover'))
            res.status(responseStatus.OK).send(responseService.createResponse(true, book, ResponseMessage.BOOK_PATCH))
        } catch (error) {
            next(error)
        }
    }

    async switchBookVisibility(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, visibility } = req.params;
            const book = await adminService.switchBookVisibility(new Types.ObjectId(id), visibility as Visibility)
            res.status(responseStatus.OK).send(responseService.createResponse(true, book, ResponseMessage.BOOK_VISIBILITY))
        } catch (error) {
            next(error)
        }
    }
    
    async deleteBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const book = await adminService.deleteBook(new Types.ObjectId(id))
            res.status(responseStatus.OK).send(responseService.createResponse(true, book, ResponseMessage.BOOK_DELETE))
        } catch (error) {
            next(error)
        }
    }
}

export default new AdminController()