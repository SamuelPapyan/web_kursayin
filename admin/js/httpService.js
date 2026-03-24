class HttpService {
    constructor(apiUri) {
        this.apiUri = apiUri;
    }

    async get(endpoint, query=null) {
        let url = `${this.apiUri}${endpoint}`
        console.log(url);
        if (query) url += this.getQueryString(query);
        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem('CSS_ANIMATION_USER_TOKEN')}`
            }
        })
        return response.json();
    }

    getQueryString(query) {
        let queryStr = "?";
        queryStr += Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&');
        return queryStr;
    }

    async post(endpoint, body) {
        let url = `${this.apiUri}${endpoint}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem('CSS_ANIMATION_USER_TOKEN')}`
            },
            body: JSON.stringify(body)
        })
        return response.json();
    }

    async patch(endpoint, body) {
        let url = `${this.apiUri}${endpoint}`
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem('CSS_ANIMATION_USER_TOKEN')}`
            },
            ...(body ? { body: JSON.stringify(body) } : {})
        })
        return response.json();
    }
    
    async delete(endpoint, id) {
        let url = `${this.apiUri}${endpoint}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('CSS_ANIMATION_USER_TOKEN')}`
            }
        })
        return response.json();
    }

    async postFormData(endpoint, formData) {
        let url = `${this.apiUri}${endpoint}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('CSS_ANIMATION_USER_TOKEN')}`
            },
            body: formData
        })
        return response.json();
    }
    
    async patchFormData(endpoint, formData) {
        let url = `${this.apiUri}${endpoint}`
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('CSS_ANIMATION_USER_TOKEN')}`
            },
            body: formData
        })
        return response.json();
    }
}

const httpService = new HttpService('http://localhost:2026/api/v1');