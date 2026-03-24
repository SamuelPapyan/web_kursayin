class AdminService {
    static async getAdmins(query=null) {
        try {
            return await httpService.get('/admin/admins')
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async getAdminById(id) {
        try {
            return await httpService.get(`/admin/admins/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async createAdmin(formData) {
        try {
            return await httpService.postFormData('/admin/admins', formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async updateAdmin(formData, id) {
        try {
            return await httpService.patchFormData(`/admin/admins/${id}`, formData);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    static async deleteAdmin(id) {
        try {
            return await httpService.delete(`/admin/admins/${id}`)
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
}