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
        <button class="btn btn-blue w-50 position-relative start-50 translate-middle-x" v-if="disabledAccountForm"
            @click="handleAccountForm">Editar</button>
        <div v-else class="d-flex justify-content-center">
            <button class="btn btn-dark w-25 mx-2" @click="handleAccountForm">Cancelar</button>
            <button type="submit" class="btn btn-green w-25 mx-2">Guardar</button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const disabledAccountForm = ref(true);
const handleAccountForm = () => disabledAccountForm.value = !disabledAccountForm.value;
</script>

<style scoped>
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

.btn {
    padding: var(--padding-button-2);
    border-radius: var(--border-radius-md);
}

.btn-blue {
    background-color: var(--blue-500);
    color: var(--white);
    box-shadow: var(--shadow-xs) var(--black-900-shadow-2);
}

.btn-blue:hover {
    background-color: var(--blue-600);
    color: var(--white);
    box-shadow: var(--shadow-sm) var(--black-900-shadow-3);
}

.btn-green {
    background-color: var(--green-400);
    color: var(--white);
    box-shadow: var(--shadow-xs) var(--black-900-shadow-2);
}

.btn-green:hover {
    background-color: var(--green-500);
    color: var(--white);
    box-shadow: var(--shadow-sm) var(--black-900-shadow-3);
}

.btn-dark {
    background-color: var(--white);
    color: var(--black-900);
    border: 1px solid var(--black-200);
}
</style>