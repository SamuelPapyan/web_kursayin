import { Request, Response, NextFunction } from 'express'
import clientService from '../services/client.service'

class ClientController {
    async getExamples(req: Request, res: Response, next: NextFunction) {
        try {
            const examples = await clientService.getExamples()
            res.status(200).send(examples)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async getTests(req: Request, res: Response, next: NextFunction) {
        try {
            const tests = await clientService.getTests()
            res.status(200).send(tests)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async getVideos(req: Request, res: Response, next: NextFunction) {
        try {
            const videos = await clientService.getVideos()
            res.status(200).send(videos)
        } catch {
            res.status(400).send({error: true})
        }
    }

    async getBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const books = await clientService.getBooks()
            res.status(200).send(books)
        } catch {
            res.status(400).send({error: true})
        }
    }
}

export default new ClientController()