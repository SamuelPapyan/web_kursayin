class BookService {
    static async getBooks(query=null) {
        try {
            return await httpService.get('/admin/books')
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async getBookById(id) {
        try {
            return await httpService.get(`/admin/books/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async createBook(formData) {
        try {
            return await httpService.postFormData('/admin/books', formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async updateBook(formData, id) {
        try {
            return await httpService.patchFormData(`/admin/books/${id}`, formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async deleteBook(id) {
        try {
            return await httpService.delete(`/admin/books/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async changeVisibility(id, isPublished) {
        try {
            const visibility = isPublished ? 'unpublish' : 'publish';
            return await httpService.patch(`/admin/books/${id}/publish/${visibility}`, null)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
}