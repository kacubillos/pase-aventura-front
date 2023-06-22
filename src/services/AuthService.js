import { ref } from 'vue';
import axios from 'axios';

class AuthService {
    constructor() {
        this.jwt = ref('');
        this.error = ref('')
    }

    getJwt() {
        return this.jwt;
    }

    getError() {
        return this.error;
    }

    async login(email, password) {
        try {
            const res = await axios({
                method: 'post',
                url: '/auth/login',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    email: email,
                    password: password
                }
            });

            if('errors' in res) {
                this.error.value = 'Login failed';
                return false;
            }

            this.jwt.value = res.data.accessToken;
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default AuthService