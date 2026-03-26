class ExampleService {
    static async getExamples(query=null) {
        try {
            return await httpService.get(`/admin/examples`, query)
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
            const data = Object.fromEntries(formData.entries())
            return await httpService.post('/admin/examples', data);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async updateExample(formData, id) {
        try {
            const data = Object.fromEntries(formData.entries())
            return await httpService.patch(`/admin/examples/${id}`, data);
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

    static async changeVisibility(id, isPublished) {
        try {
            const visibility = isPublished ? 'unpublish' : 'publish';
            return await httpService.patch(`/admin/examples/${id}/publish/${visibility}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
}