<template>
    <div class="row">
        <div class="col-12 col-md-6 p-0 position-absolute start-0 top-0">
            <router-link to="/" class="d-flex align-items-center justify-content-start m-5 px-5">
                <v-icon name="bi-arrow-left-short" scale="1.5" />
                <span class="fs-6">Inicio</span>
            </router-link>
            <div class="d-flex flex-column px-5 mx-5 my-4">
                <div class="alert alert-danger" v-if="error" role="alert">
                    {{ errorMsg }}
                </div>
                <h1 class="title text-center">¡Bienvenido!</h1>
                <form @submit.prevent="login">
                    <div class="mb-4">
                        <label for="exampleInputEmail1" class="form-label">Correo electronico</label>
                        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Introduce tu correo electronico">
                    </div>
                    <div class="mb-4">
                        <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                            placeholder="Introduce tu contraseña">
                    </div>
                    <button type="submit" class="btn btn-login w-100 my-3">Iniciar sesión</button>
                </form>
                <div class="text-center d-flex justify-content-between my-2 mx-auto">
                    <a>¿Olvidaste tu contraseña?</a>
                </div>
            </div>
        </div>
        <div class="col-md-8 d-none d-md-block p-0">
            <div class="
              cover
              d-flex
              justify-content-end
              p-5
              align-items-start
              flex-column
            ">
                <h1>The largest community</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from "../store/auth.js";

const router = useRouter();

let email = ref('');
let password = ref('');

let error = ref(false);
let errorMsg = ref('false');

const login = async () => {
    const auth = useAuthStore();
    const success = await auth.login(email.value, password.value);

    if (success)
        router.push('/');
    else {
        error.value = true;
        errorMsg.value = auth.error;
    }
}
</script>

<style scoped>
.title {
    color: var(--neutral-title);
}

.form-control {
    border-radius: var(--border-radius-xs);
    padding: var(--padding-button-1);
}

.form-control::placeholder {
    color: var(--neutral-text-light);
}

.form-control:hover {
    border-color: var(--neutral-border-strong);
}

.btn-login {
    border-radius: var(--border-radius-xs);
    padding: var(--padding-button-2);
    background-color: var(--blue-500);
    color: var(--white);
    box-shadow: var(--shadow-xs) var(--black-900-shadow-2);
}

.btn-login:hover {
    background-color: var(--blue-600);
    color: var(--white);
    box-shadow: var(--shadow-sm) var(--black-900-shadow-3);
}

.cover {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 50%;
    color: white;
    background-image: url(https://images.pexels.com/photos/1968177/pexels-photo-1968177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);
    background-size: cover;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.5);
    background-blend-mode: darken;
}
</style>