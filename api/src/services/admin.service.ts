import { Types } from "mongoose";
import { IExample } from "../interfaces/example.interface";
import { Book } from "../models/book.model";
import { Example } from "../models/example.model";
import { Test } from "../models/test.model";
import { Video } from "../models/video.model";
import { ITest } from "../interfaces/test.interface";
import { IVideo } from "../interfaces/video.interface";
import { IBook } from "../interfaces/book.interface";

class AdminService {
    async getExamples() {
        return await Example.find();
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

    async getTests() {
        return await Test.find().populate('variants').populate('answer')
    }

    async createTest(test: ITest) {
        return await Test.create(test)
    }

    async updateTest(id: Types.ObjectId, test: ITest) {
        return await Test.findByIdAndUpdate(id, test)
    }

    async deleteTest(id: Types.ObjectId) {
        return await Test.findByIdAndDelete(id)
    }

    async getVideos() {
        return await Video.find().populate('details')
    }

    async createVideo(video: IVideo) {
        return await Video.create(video)
    }

    async updateVideo(id: Types.ObjectId, video: IVideo) {
        return await Video.findByIdAndUpdate(id, video)
    }

    async deleteVideo(id: Types.ObjectId) {
        return await Video.findByIdAndDelete(id)
    }

    async getBooks() {
        return await Book.find()
    }

    async createBook(book: IBook) {
        return await Book.create(book)
    }

    async updateBook(id: Types.ObjectId, book: IBook) {
        return await Book.findByIdAndUpdate(id, book)
    }

    async deleteBook(id: Types.ObjectId) {
        return await Book.findByIdAndDelete(id)
    }
}

export default new AdminService();