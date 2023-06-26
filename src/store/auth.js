import { defineStore } from "pinia";
import axios from "axios";
import jwtDecode from "jwt-decode";

const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: null,
            currentUser: {
                email: '',
                role: ''
            }
        }
    },
    actions: {
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
                    return false;
                }

                this.token = res.data.accessToken;
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;

                // Get the JWT claims
                let decoded = jwtDecode(this.token);
                this.currentUser.email = decoded.sub;
                this.currentUser.role = decoded.role;

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});

export default useAuthStore