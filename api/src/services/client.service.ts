import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { Book } from "../models/book.model";
import { Example } from "../models/example.model";
import { Question } from "../models/question.model";
import { Video } from "../models/video.model";
import { IOTP } from "../interfaces/otp.interface";
import mailService from "./mail.service";
import redisService from "./redis.service";
import { Student } from "../models/student.model";
import { UserPayload } from "../interfaces/user-payload.interface";
import authService from "./auth.service";

class ClientService {
    async login(email: string) {
        try {
            let otp = ""
            for (let i = 0; i < 6; i++)
                otp += Math.floor((Math.random() * 10))
            await redisService.storeData(`studentLogin:${email}`, {otp})
            await mailService.sendMail(email, "CSS Animation Student Login Verification", `
                    <h3>Student Login Verification</h3>
                    <p>You have 15 minutes to verify your login</p>
                    <p>${otp}</p>
                `)
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }   
    }

    async verifyLogin(email: string, code: string) {
        const codeObj = JSON.parse(await redisService.getData(`studentLogin:${email}`) as string);
        if (!codeObj) throw new UnauthorizedException("Code is expired");
        const { otp } = codeObj as IOTP;
        if (code !== otp) throw new UnauthorizedException("Wrong Code");
        let user = await Student.findOne({email});
        if (!user) {
            user = await (new Student({email})).save();
        }
        const userPayload: UserPayload = {
            userId: user._id.toString(),
            username: email
        }
        return await authService.generateToken(userPayload);
    }

    async getExamples() {
        return await Example.find({isPublished: true});
    }

    async getTests() {
        return await Question.find({isPublished: true}).populate('variants').populate('answer')
    }

    async getVideos() {
        return await Video.find({isPublished: true}).populate('details')
    }

    async getBooks() {
        return await Book.find({isPublished: true})
    }
}

export default new ClientService();