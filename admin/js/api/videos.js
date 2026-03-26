class VideoService {
    static async getVideos(query=null) {
        try {
            return await httpService.get(`/admin/videos`, query);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async getVideoById(id) {
        try {
            return await httpService.get(`/admin/videos/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async createVideo(formData) {
        try {
            return await httpService.postFormData('/admin/videos', formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async updateVideo(formData, id) {
        try {
            return await httpService.patchFormData(`/admin/videos/${id}`, formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async deleteVideo(id) {
        try {
            return await httpService.delete(`/admin/videos/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async changeVisibility(isPublished) {
        try {
            const visibility = isPublished ? 'unpublish' : 'publish';
            return await httpService.patch(`/admin/videos/${id}/publish/${visibility}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
}