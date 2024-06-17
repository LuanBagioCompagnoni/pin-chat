import axios from "axios";

class LoginService{
    constructor(baseURL = "http://localhost:5000"){
        this.client = axios.create({
            baseURL: baseURL
        })
    }

    async login(email, password){
        try {
            const response = await this.client.post('/login', {email, password});
            return response.data;

        } catch (error) {
            throw new Error(error)
        }
    }
}

export default LoginService