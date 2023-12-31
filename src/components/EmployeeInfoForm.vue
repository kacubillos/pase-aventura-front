<template>
    <form @submit.prevent="saveEmployee" class="w-100 w-md-75 mb-3">
        <fieldset>
            <legend class="my-3">Foto de perfil</legend>
            <div class="img-container">
                <img src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                    alt="profile image">
            </div>
        </fieldset>
        <fieldset :disabled="disabledDataForm">
            <legend class="my-3">Datos personales</legend>
            <div class="row mb-3">
                <div class="col-12 col-md-6">
                    <label for="docType" class="form-label">Tipo de documento</label>
                    <select class="form-select" v-model="props.content.documentType" id="docType">
                        <option value="C.C">C.C</option>
                        <option value="T.I">T.I</option>
                    </select>
                </div>
                <div class="col-12 col-md-6">
                    <label for="docNum" class="form-label">Numero de documento</label>
                    <input type="number" v-model="props.content.documentNum" class="form-control" id="docNum">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12 col-md-6">
                    <label for="firstname" class="form-label">Nombres</label>
                    <input type="text" v-model="props.content.name" class="form-control" id="firstname">
                </div>
                <div class="col-12 col-md-6">
                    <label for="lastname" class="form-label">Apellidos</label>
                    <input type="text" v-model="props.content.lastname" class="form-control" id="lastname">
                </div>
            </div>
            <div class="mb-3">
                <label for="birthDay" class="form-label">Fecha de nacimiento</label>
                <input type="date" v-model="props.content.birthDate" class="form-control" id="birthDay">
            </div>
            <div class="mb-3">
                <label for="role" class="form-label">Rol</label>
                <select class="form-select" v-model="props.content.roleId" id="role">
                    <option value="1">Administrador</option>
                    <option value="2">Empleado</option>
                </select>
            </div>
            <div class="mb-3" v-if="props.content.roleId == 2">
                <label for="game" class="form-label">Juego</label>
                <select class="form-select" id="game" v-model="props.content.gameId">
                    <option :value="game.gameId" v-for="game in games" :key="game.gameId">
                        {{ game.name }}
                    </option>
                </select>
            </div>
        </fieldset>
        <button class="btn btn-blue w-50 position-relative start-50 translate-middle-x" v-if="disabledDataForm"
            @click="handleDataForm">Editar</button>
        <div v-else class="d-flex justify-content-center">
            <button class="btn btn-dark w-25 mx-2" @click="handleDataForm">Cancelar</button>
            <button type="submit" class="btn btn-green w-25 mx-2">Guardar</button>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EmployeeService from '../services/EmployeeService.js';
import GameService from '../services/GameService';

const router = useRouter();
const gameService = new GameService();
const empService = new EmployeeService();

const games = gameService.getGames();

const props = defineProps(['content']);

const disabledDataForm = ref(true);

const handleDataForm = () => disabledDataForm.value = !disabledDataForm.value;

onMounted(async () => {
    await gameService.fetchAll();
});

const saveEmployee = async () => {
    const isSuccess = await empService.update(props.content);

    if (isSuccess)
        router.push('/empleados');
    else
        alert('Error, verifique la información.');
}
</script>

<style scoped>
.img-container {
    width: 200px;
    height: 200px;
    border-radius: 15px;
    overflow: hidden;
    margin: 0 auto;
    transition: 400ms;
}

.img-container>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.form-control,
.form-select {
    border-radius: var(--border-radius-xs);
    padding: var(--padding-button-1);
}

.form-control::placeholder {
    color: var(--neutral-text-light);
}

.form-control:hover,
.form-select:hover {
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