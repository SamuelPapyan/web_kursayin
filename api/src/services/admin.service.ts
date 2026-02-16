import { Types } from "mongoose";
import { IExample } from "../interfaces/example.interface";
import { Book } from "../models/book.model";
import { Example } from "../models/example.model";
import { Test } from "../models/test.model";
import { Video } from "../models/video.model";
import { IVideo } from "../interfaces/video.interface";
import { IBook } from "../interfaces/book.interface";
import { ITest } from "../interfaces/test.interface";
import cloudinaryService from "./cloudinary.service";
import { FileType } from "../enums/file-type.enum";
import { Visibility } from "../enums/visibility.enum";
import { ValidationException } from "../exceptions/validation.exception";
import { NotFoundException } from "../exceptions/not-found.exception";
import { ResourceType } from "../enums/resource-type.enum";
import { ILogin, UserPayload } from "../interfaces/user-payload.interface";
import { Admin } from "../models/admin.model";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import bcrypt from "bcrypt"
import authService from "./auth.service";
import { IAdmin } from "../interfaces/admin.interface";

class AdminService {
    async login(loginDto: ILogin) {
        const { username, password } = loginDto;
        const user = await Admin.findOne({username})
        if (!user) throw new UnauthorizedException("Invalid username or password")
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) throw new UnauthorizedException("Invalid username or password")
        const userPayload: UserPayload = {
            userId: user._id.toString(),
            username
        }
        return await authService.generateToken(userPayload)
    }

    async getProfile(user: UserPayload) {
        return user
    }

    async getAdmins() {
        return await Admin.find().select('_id username')
    }
    
    async getAdminById(id: Types.ObjectId) {
        const data = await Admin.findById(id).select('_id username');
        if (!data) throw new NotFoundException(ResourceType.ADMIN, id)
        return data
    }

    async createAdmin(admin: IAdmin) {
        return await Admin.create(admin)
    }

    async updateAdmin(id: Types.ObjectId, admin: IAdmin) {
        const data = await Admin.findByIdAndUpdate(id, admin);
        if (!data) throw new NotFoundException(ResourceType.ADMIN, id)
        return data
    }
    
    async deleteAdmin(id: Types.ObjectId) {
        const data = await Admin.findByIdAndDelete(id);
        if (!data) throw new NotFoundException(ResourceType.ADMIN, id)
        return data
    }

    async getExamples() {
        return await Example.find();
    }

    async getExampleById(id: Types.ObjectId) {
        const data = await Example.findById(id)
        if (!data) throw new NotFoundException(ResourceType.EXAMPLE, id)
        return data;
    }

    async createExample(example: IExample) {
        return await Example.create(example)
    }

    async updateExample(id: Types.ObjectId, example: IExample) {
        const data = await Example.findByIdAndUpdate(id, example)
        if (!data) throw new NotFoundException(ResourceType.EXAMPLE, id)
        return data;
    }

    async deleteExample(id: Types.ObjectId) {
        const data = await Example.findByIdAndDelete(id);
        if (!data) throw new NotFoundException(ResourceType.EXAMPLE, id)
        return data;
    }

    async switchExampleVisibility(id: Types.ObjectId, visibility: Visibility) {
        const isPublished = visibility === Visibility.PUBLISH
        const data = await Example.findByIdAndUpdate(id, { isPublished })
        if (!data) throw new NotFoundException(ResourceType.EXAMPLE, id)
        return data;
    }

    async getTests() {
        return await Test.find()
    }

    async getTestById(id: Types.ObjectId) {
        const data =  await Test.findById(id)
        if (!data) throw new NotFoundException(ResourceType.TEST, id)
        return data;
    }

    async createTest(test: ITest) {
        const { title, themeLink, variants, answer } = test;
        return await Test.create({title, variants, answer, themeLink})
    }

    async updateTest(id: Types.ObjectId, test: ITest) {
        const { title, themeLink, variants, answer } = test;
        const data =  await Test.findByIdAndUpdate(id, {title, variants, answer, themeLink})
        if (!data) throw new NotFoundException(ResourceType.TEST, id)
        return data;
    }

    async deleteTest(id: Types.ObjectId) {
        const data = await Test.findByIdAndDelete(id)
        if (!data) throw new NotFoundException(ResourceType.TEST, id)
        return data;
    }

    async switchTestVisibility(id: Types.ObjectId, visibility: Visibility) {
        const isPublished = visibility === Visibility.PUBLISH
        const data = await Test.findByIdAndUpdate(id, { isPublished })
        if (!data) throw new NotFoundException(ResourceType.TEST, id)
        return data;
    }

    async getVideos() {
        return await Video.find()
    }

    async getVideoById(id: Types.ObjectId) {
        const data = await Video.findById(id)
        if (!data) throw new NotFoundException(ResourceType.VIDEO, id)
        return data;
    }

    async createVideo(video: IVideo, file: string) {
        const { title, youtubeId, details } = video;
        let videoUrl = null;
        if (!file && !youtubeId)
            throw new ValidationException([
                { property: 'videoFile', message: "Video file is required if you don't use YouTube video" },
                { property: 'youtubeId', message: "YouTube video link is required if you don't use video file" },
            ])
        if (file) 
            videoUrl = await cloudinaryService.uploadFile(file, Date.now().toString(), FileType.VIDEO, 'css_animation/video_files')
        return await Video.create({
            title,
            ...(youtubeId ? { youtubeId } : {}),
            ...(videoUrl ? { videoUrl } : {}),
            details
        })
    }

    async updateVideo(id: Types.ObjectId, video: IVideo, file: string) {
        const {title, youtubeId, details} = video;
        let videoUrl = null;
        if (!(await Video.findById(id))) throw new NotFoundException(ResourceType.VIDEO, id)
        if (file) {
            const tmp = await Video.findById(id);
            await cloudinaryService.removeFile(tmp.videoUrl)
            videoUrl = await cloudinaryService.uploadFile(file, id.toString(), FileType.VIDEO, 'css_animation/video_files')
        }
        return await Video.findByIdAndUpdate(id, {
            title,
            ...( youtubeId ? { youtubeId } : {}),
            ...( videoUrl ? { videoUrl } : {}),
            details
        })
    }

    async deleteVideo(id: Types.ObjectId) {
        const tmp = await Video.findByIdAndDelete(id)
        if (!tmp) throw new NotFoundException(ResourceType.VIDEO, id)
        if (tmp.videoUrl)
            await cloudinaryService.removeFile(tmp.videoUrl);
        return tmp
    }

    async switchVideoVisibility(id: Types.ObjectId, visibility: Visibility) {
        const isPublished = visibility === Visibility.PUBLISH
        const data = await Video.findByIdAndUpdate(id, { isPublished })
        if (!data) throw new NotFoundException(ResourceType.VIDEO, id)
        return data;
    }

    async getBooks() {
        return await Book.find()
    }

    async getBookById(id: Types.ObjectId) {
        const data = await Book.findById(id)
        if (!data) throw new NotFoundException(ResourceType.BOOK, id)
        return data;
    }

    async createBook(book: IBook, file: string) {
        if (file) 
            book.cover = await cloudinaryService.uploadFile(file, Date.now().toString(), FileType.IMAGE, 'css_animation/book_covers');
        return await Book.create(book)
    }

    async updateBook(id: Types.ObjectId, book: IBook, file: string) {
        if (!(await Book.findById(id)))
            throw new NotFoundException(ResourceType.BOOK, id)
        if (file) {
            const theBook = await Book.findById(id);
            await cloudinaryService.removeFile(theBook.cover);
            const url = await cloudinaryService.uploadFile(file, id.toString(), FileType.IMAGE, 'css_animation/book_covers')
            book.cover = url           
        }
        return await Book.findByIdAndUpdate(id, book)
    }

    async deleteBook(id: Types.ObjectId) {
        const tmp = await Book.findByIdAndDelete(id);
        if (!tmp) throw new NotFoundException(ResourceType.BOOK, id)
        if (tmp.cover)
            await cloudinaryService.removeFile(tmp.cover);
        return tmp
    }

    async switchBookVisibility(id: Types.ObjectId, visibility: Visibility) {
        const isPublished = visibility === Visibility.PUBLISH
        const data = await Book.findByIdAndUpdate(id, { isPublished })
        if (!data) throw new NotFoundException(ResourceType.BOOK, id)
        return data;
    }
}

export default new AdminService();