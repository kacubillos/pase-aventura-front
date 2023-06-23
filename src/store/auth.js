import { defineStore } from "pinia";
import axios from "axios";

const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: null
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
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});

export default useAuthStore