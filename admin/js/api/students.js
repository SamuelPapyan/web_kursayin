class StudentService {
    static async getStudents(query=null) {
        try {
            return await httpService.get(`/admin/students`, query)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async getStudentById(id) {
        try {
            return await httpService.get(`/admin/students/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async createStudent(formData) {
        try {
            return await httpService.postFormData('/admin/students', formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async updateStudent(formData, id) {
        try {
            return await httpService.patchFormData(`/admin/students/${id}`, formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async deleteStudent(id) {
        try {
            return await httpService.delete(`/admin/students/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
}