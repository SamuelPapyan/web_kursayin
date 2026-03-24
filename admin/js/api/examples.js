class ExampleService {
    static async getExamples(query=null) {
        try {
            return await httpService.get('/admin/examples')
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async getExampleById(id) {
        try {
            return await httpService.get(`/admin/examples/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async createExample(formData) {
        try {
            return await httpService.postFormData('/admin/examples', formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async updateExample(formData, id) {
        try {
            return await httpService.patchFormData(`/admin/examples/${id}`, formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async deleteExample(id) {
        try {
            return await httpService.delete(`/admin/examples/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async changeVisibility(isPublished) {
        try {
            const visibility = isPublished ? 'unpublish' : 'publish';
            return await httpService.patch(`/admin/examples/${id}/publish/${visibility}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
}