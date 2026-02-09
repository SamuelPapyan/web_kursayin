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

class AdminService {
    async getExamples() {
        return await Example.find();
    }

    async getExampleById(id: Types.ObjectId) {
        return await Example.findById(id)
    }

    async createExample(example: IExample) {
        return await Example.create(example)
    }

    async updateExample(id: Types.ObjectId, example: IExample) {
        return await Example.findByIdAndUpdate(id, example)
    }

    async deleteExample(id: Types.ObjectId) {
        return await Example.findByIdAndDelete(id)
    }

    async switchExampleVisibility(id: Types.ObjectId, visibility: Visibility) {
        const isPublished = visibility === Visibility.PUBLISH
        return await Example.findByIdAndUpdate(id, { isPublished })
    }

    async getTests() {
        return await Test.find()
    }

    async getTestById(id: Types.ObjectId) {
        return await Test.findById(id)
    }

    async createTest(test: ITest) {
        const { title, themeLink, variants, answer } = test;
        return await Test.create({title, variants, answer, themeLink})
    }

    async updateTest(id: Types.ObjectId, test: ITest) {
        const { title, themeLink, variants, answer } = test;
        return await Test.findByIdAndUpdate(id, {title, variants, answer, themeLink})
    }

    async deleteTest(id: Types.ObjectId) {
        return await Test.findByIdAndDelete(id)
    }

    async switchTestVisibility(id: Types.ObjectId, visibility: Visibility) {
        const isPublished = visibility === Visibility.PUBLISH
        return await Test.findByIdAndUpdate(id, { isPublished })
    }

    async getVideos() {
        return await Video.find()
    }

    async getVideoById(id: Types.ObjectId) {
        return await Video.findById(id)
    }

    async createVideo(video: IVideo, file: string) {
        const { title, youtubeId, details } = video;
        let videoUrl = null;
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
        if (tmp.videoUrl)
            await cloudinaryService.removeFile(tmp.videoUrl);
        return tmp
    }

    async switchVideoVisibility(id: Types.ObjectId, visibility: Visibility) {
        const isPublished = visibility === Visibility.PUBLISH
        return await Video.findByIdAndUpdate(id, { isPublished })
    }

    async getBooks() {
        return await Book.find()
    }

    async getBookById(id: Types.ObjectId) {
        return await Book.findById(id)
    }

    async createBook(book: IBook, file: string) {
        if (file) 
            book.cover = await cloudinaryService.uploadFile(file, Date.now().toString(), FileType.IMAGE, 'css_animation/book_covers');
        return await Book.create(book)
    }

    async updateBook(id: Types.ObjectId, book: IBook, file: string) {
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
        if (tmp.cover)
            await cloudinaryService.removeFile(tmp.cover);
        return tmp
    }

    async switchBookVisibility(id: Types.ObjectId, visibility: Visibility) {
        const isPublished = visibility === Visibility.PUBLISH
        return await Book.findByIdAndUpdate(id, { isPublished })
    }
}

export default new AdminService();