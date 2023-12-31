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
            },
            error: ''
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

                if(res.status == 401) {
                    this.error = 'El correo electronico o la contraseña son incorrectos.';
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
                this.error = 'El correo electronico o la contraseña son incorrectos.';
                return false;
            }
        },
        logout() {
            this.token = null;
            this.currentUser = {
                email: '',
                role: ''
            }
        }
    },
    persist: {
        afterRestore: (ctx) => {
            if(ctx.store.token != null)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.store.token;
        }
    }
});

export default useAuthStore