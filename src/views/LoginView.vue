<template>
    <div class="row">
        <div class="col-12 col-md-6 p-0 position-absolute start-0 top-0">
            <router-link to="/" class="d-flex align-items-center justify-content-start m-5 px-5">
                <v-icon name="bi-arrow-left-short" scale="1.5" />
                <span class="fs-6">Inicio</span>
            </router-link>
            <div class="d-flex flex-column px-5 mx-5 my-4">
                <h1 class="text-center">¡Bienvenido!</h1>
                <form @submit.prevent="login">
                    <div class="mb-4">
                        <label for="exampleInputEmail1" class="form-label">Correo electronico</label>
                        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>
                    <div class="mb-4">
                        <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
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

const login = async () => {
    const auth = useAuthStore();
    const success = await auth.login(email.value, password.value);

    if (success)
        router.push('/');
    else
        console.log('Error');
}
</script>

<style scoped>
.btn-login {
  border-radius: 5px;
  padding: 0.7rem 0.7rem;
  background-color: #457b9d;
  color: var(--white);
  box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.1);
}
.btn-login:hover {
  background-color: #457b9d;
  color: var(--white);
  box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.2);
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