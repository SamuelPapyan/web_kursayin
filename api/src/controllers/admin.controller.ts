import { Request, Response, NextFunction } from 'express'
import adminService from '../services/admin.service'
import { Types } from 'mongoose'
import { IBook } from '../interfaces/book.interface'
import { Visibility } from '../enums/visibility.enum'

class AdminController {
    async getExamples(req: Request, res: Response, next: NextFunction) {
        try {
            const examples = await adminService.getExamples()
            res.status(200).send(examples)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async getExampleById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const examples = await adminService.getExampleById(new Types.ObjectId(id))
            res.status(200).send(examples)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async createExample(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const example = await adminService.createExample(body)
            res.status(200).send(example)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async updateExample(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { body } = req;
            const example = await adminService.updateExample(new Types.ObjectId(id), body)
            res.status(200).send(example)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async switchExampleVisibility(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, visibility } = req.params;
            const example = await adminService.switchExampleVisibility(new Types.ObjectId(id), visibility as Visibility)
            res.status(200).send(example)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async deleteExample(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const example = await adminService.deleteExample(new Types.ObjectId(id))
            res.status(200).send(example)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async getTests(req: Request, res: Response, next: NextFunction) {
        try {
            const tests = await adminService.getTests()
            res.status(200).send(tests)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async getTestById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const test = await adminService.getTestById(new Types.ObjectId(id))
            res.status(200).send(test)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async createTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const test = await adminService.createTest(body)
            res.status(200).send(test)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async updateTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { body } = req;
            const test = await adminService.updateTest(new Types.ObjectId(id), body)
            res.status(200).send(test)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async switchTestVisibility(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, visibility } = req.params;
            const test = await adminService.switchTestVisibility(new Types.ObjectId(id), visibility as Visibility)
            res.status(200).send(test)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async deleteTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const test = await adminService.deleteTest(new Types.ObjectId(id))
            res.status(200).send(test)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async getVideos(req: Request, res: Response, next: NextFunction) {
        try {
            const videos = await adminService.getVideos()
            res.status(200).send(videos)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async getVideoById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const video = await adminService.getVideoById(new Types.ObjectId(id))
            res.status(200).send(video)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async createVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const file = req.encodedFiles.get('videoFile');
            const video = await adminService.createVideo(body, file)
            res.status(200).send(video)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async updateVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { body } = req;
            const file = req.encodedFiles.get('videoFile');
            const video = await adminService.updateVideo(new Types.ObjectId(id), body, file)
            res.status(200).send(video)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async switchVideoVisibility(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, visibility } = req.params;
            const video = await adminService.switchVideoVisibility(new Types.ObjectId(id), visibility as Visibility)
            res.status(200).send(video)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async deleteVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const video = await adminService.deleteVideo(new Types.ObjectId(id))
            res.status(200).send(video)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async getBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const books = await adminService.getBooks()
            res.status(200).send(books)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async getBookById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const book = await adminService.getExampleById(new Types.ObjectId(id))
            res.status(200).send(book)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async createBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, link } = req.body as IBook;
            const book = await adminService.createBook({title, link}, req.encodedFiles.get('cover'))
            res.status(200).send(book)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async updateBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { title, link } = req.body
            const book = await adminService.updateBook(new Types.ObjectId(id), {title, link}, req.encodedFiles.get('cover'))
            res.status(200).send(book)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async switchBookVisibility(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, visibility } = req.params;
            const book = await adminService.switchBookVisibility(new Types.ObjectId(id), visibility as Visibility)
            res.status(200).send(book)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async deleteBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const book = await adminService.deleteBook(new Types.ObjectId(id))
            res.status(200).send(book)
        } catch {
            res.status(400).send({error: true})
        }
    }
}

export default new AdminController()