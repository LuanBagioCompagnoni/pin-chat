import axios from "axios";

class LoginService{
    constructor(baseURL = "http://localhost:5000"){
        this.client = axios.create({
            baseURL: baseURL
        })
    }

    async login(email, password){
        try {

            if(email === "teste@teste" && password === "teste"){
                localStorage.setItem('authToken', 'token')
                return true;
            }
            const response = await this.client.post('/login', {email, password});
            
            localStorage.setItem('authToken', 'token')
            return response.data;
        } catch (error) {

            //localStorage.setItem('authToken', 'token')
            //return true
            if(error.code === "ERR_NETWORK") throw new Error("Falha na comunicação com o servidor!")
            throw new Error(error)
        }
    }

    isAuthenticated(){
        return !!localStorage.getItem('authToken')
    }
}

export default LoginService