<template>
    <form class="ms-0 ms-md-3">
        <fieldset :disabled="disabledAccountForm">
            <legend class="my-3">Ajustes de la cuenta</legend>
            <div class="mb-3">
                <label for="email" class="form-label">Correo electronico</label>
                <input type="email" class="form-control" id="email">
            </div>
            <div class="row">
                <div class="col-12 col-md-6">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password">
                    <div id="passwordHelp" class="form-text">Si no quieres cambiar la contraseña deja esto en blanco
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <label for="repeatPassword" class="form-label">Repetir contraseña</label>
                    <input type="password" class="form-control" id="repeatPassword">
                </div>
                <div></div>
            </div>
        </fieldset>
        <button class="btn btn-warning w-50 position-relative start-50 translate-middle-x" v-if="disabledAccountForm"
            @click="handleAccountForm">Editar</button>
        <div v-else class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary w-25 mx-2">Guardar</button>
            <button class="btn btn-dark w-25 mx-2" @click="handleAccountForm">Cancelar</button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const disabledAccountForm = ref(true);
const handleAccountForm = () => disabledAccountForm.value = !disabledAccountForm.value;
</script>

<style>
.btn {
    border-radius: 5px;
    padding: 0.7rem 0.7rem;
}
</style>