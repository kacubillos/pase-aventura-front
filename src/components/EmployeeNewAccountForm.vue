<template>
    <div class="row align-items-center justify-content-center m-4">
        <form class="form col-12 col-md-6">
            <fieldset>
                <legend class="my-3">Ajustes de la cuenta</legend>
                <div class="mb-3">
                    <label for="email" class="form-label">Correo electronico</label>
                    <input type="email" class="form-control" id="email" v-model="email">
                </div>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="password" v-model="password">
                        <div id="passwordHelp" class="form-text text-danger" v-if="passwordError">
                            Las contraseñas no coinciden.
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="repeatPassword" class="form-label">Repetir contraseña</label>
                        <input type="password" class="form-control" id="repeatPassword" v-model="repeatPassword">
                    </div>
                    <div></div>
                </div>
                <button type="submit" class="btn btn-primary position-relative start-50 translate-middle-x my-4 px-5" @click.prevent="saveAccount">Guardar</button>
            </fieldset>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['nextStep']);

let passwordError = ref(false);

let email = ref('');
let password = ref('');
let repeatPassword = ref('');

/* Error cuando las contraseñas no coinciden, no se crea usuario */
const saveAccount = () => {
    if(password.value == repeatPassword.value)
        emit('nextStep', { email: email.value, password: password.value });
    else
        passwordError.value = true;
}
</script>

<style scoped></style>