import { Book } from "../models/book.model";
import { Example } from "../models/example.model";
import { Test } from "../models/test.model";
import { Video } from "../models/video.model";

class ClientService {
    async getExamples() {
        return await Example.find();
    }

    async getTests() {
        return await Test.find().populate('variants').populate('answer')
    }

    async getVideos() {
        return await Video.find().populate('details')
    }

    async getBooks() {
        return await Book.find()
    }
}

export default new ClientService();