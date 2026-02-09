import { v2 as cloudinary } from 'cloudinary'
import { extractPublicId } from 'cloudinary-build-url'
import { FileType } from '../enums/file-type.enum'

class CloudinaryService {
    setupCloudinary() {
        const {
            CLOUDINARY_API_KEY,
            CLOUDINARY_API_SECRET,
            CLOUDINARY_CLOUD_NAME
        } = process.env
        cloudinary.config({
            cloud_name: CLOUDINARY_CLOUD_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET
        })
        console.log("Cloudinary configured successfully.")
    }

    async uploadFile(path: string, name: string, fileType: FileType, folder: string) {
        try {
            const data = await cloudinary.uploader.upload(path, {
                resource_type: fileType,
                public_id: name,
                folder
            })
            return data.url;
        } catch (error) {
            console.log("Upload Error: ", error.message);
            return null;
        }
    }

    async removeFile(url: string) {
        try {
            const publicId = extractPublicId(url)
            const data = await cloudinary.uploader.destroy(publicId)
            return data;
        } catch (error) {
            console.log("File Remove Error: ", error.message);
            return null;
        }
    }
}

export default new CloudinaryService();