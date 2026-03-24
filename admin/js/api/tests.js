class TestService {
    static async getTests(query=null) {
        try {
            return await httpService.get('/admin/tests')
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async getTestById(id) {
        try {
            return await httpService.get(`/admin/tests/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async createTest(formData) {
        try {
            return await httpService.postFormData('/admin/tests', formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async updateTest(formData, id) {
        try {
            return await httpService.patchFormData(`/admin/tests/${id}`, formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async deleteTest(id) {
        try {
            return await httpService.delete(`/admin/tests/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async changeVisibility(isPublished) {
        try {
            const visibility = isPublished ? 'unpublish' : 'publish';
            return await httpService.patch(`/admin/tests/${id}/publish/${visibility}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
}