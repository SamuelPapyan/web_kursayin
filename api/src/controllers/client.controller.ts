import { Request, Response, NextFunction } from 'express'
import clientService from '../services/client.service'
import { IStudentLogin, IStudentVerifyLogin } from '../interfaces/student-login.interface'
import { responseStatus } from '../enums/response.enum'
import responseService from '../services/response.service';
import { ResponseMessage } from '../enums/response-message.enum';

class ClientController {

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body as unknown as IStudentLogin;
            const ok = await clientService.login(email);
            res.status(responseStatus.OK).send(responseService.createResponse(ok, ok, ok ? ResponseMessage.STUDENT_LOGIN : ""))
        } catch {
            res.status(400).send({error: true})
        }
    }
    
    async verifyLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, code } = req.body as unknown as IStudentVerifyLogin;
            const token = await clientService.verifyLogin(email, code);
            res.status(responseStatus.OK).send(responseService.createResponse(true, token, ResponseMessage.STUDENT_VERIFY))
        } catch {
            res.status(400).send({error: true})
        }
    }

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