import { Request, Response, NextFunction } from 'express'
import adminService from '../services/admin.service'
import { Types } from 'mongoose'

class AdminController {
    async getExamples(req: Request, res: Response, next: NextFunction) {
        try {
            const examples = await adminService.getExamples()
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

    async createVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const video = await adminService.createVideo(body)
            res.status(200).send(video)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async updateVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { body } = req;
            const video = await adminService.updateVideo(new Types.ObjectId(id), body)
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

    async createBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const book = await adminService.createVideo(body)
            res.status(200).send(book)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async updateBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { body } = req;
            const book = await adminService.updateVideo(new Types.ObjectId(id), body)
            res.status(200).send(book)
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async deleteBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const book = await adminService.deleteVideo(new Types.ObjectId(id))
            res.status(200).send(book)
        } catch {
            res.status(400).send({error: true})
        }
    }
}

export default new AdminController()