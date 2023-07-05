<template>
    <div class="row align-items-center justify-content-center">
        <form @submit.prevent="saveEmployee" class="form col-12 col-md-6 col-lg-8 m-4">
            <fieldset>
                <legend class="my-3">Foto de perfil</legend>
                <div class="img-container">
                    <img src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                        alt="profile image">
                </div>
            </fieldset>
            <fieldset>
                <legend class="my-3">Datos personales</legend>
                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <label for="docType" class="form-label">Tipo de documento</label>
                        <select class="form-select" v-model="employee.documentType" id="docType" required>
                            <option value="C.C">C.C</option>
                            <option value="T.I">T.I</option>
                        </select>
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="docNum" class="form-label">Numero de documento</label>
                        <input type="number" v-model="employee.documentNum" class="form-control" id="docNum" required>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12 col-md-6">
                        <label for="firstname" class="form-label">Nombres</label>
                        <input type="text" v-model="employee.name" class="form-control" id="firstname" required>
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="lastname" class="form-label">Apellidos</label>
                        <input type="text" v-model="employee.lastname" class="form-control" id="lastname" required>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="birthDay" class="form-label">Fecha de nacimiento</label>
                    <input type="date" v-model="employee.birthDate" class="form-control" id="birthDay" required>
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Rol</label>
                    <select class="form-select" v-model="employee.roleId" id="role" required>
                        <option value="1">Administrador</option>
                        <option value="2">Empleado</option>
                    </select>
                </div>
                <div class="mb-3" v-if="employee.roleId == 2">
                    <label for="role" class="form-label">Juego asignado</label>
                    <select class="form-select" v-model="employee.gameId" id="role">
                        <option value="1">Toro mecanico</option>
                        <option value="2">Montaña rusa</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-blue position-relative start-50 translate-middle-x my-4 px-5">Guardar</button>
            </fieldset>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let employee = ref({
    documentType: '',
    documentNum: 0,
    name: '',
    lastname: '',
    birthDate: '',
    roleId: 0
});

const emit = defineEmits(['nextStep']);

const saveEmployee = () => {
    emit('nextStep', employee.value);
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

.form-control, .form-select {
    border-radius: var(--border-radius-xs);
    padding: var(--padding-button-1);
}

.form-control::placeholder {
    color: var(--neutral-text-light);
}

.form-control:hover, .form-select:hover {
    border-color: var(--neutral-border-strong);
}

.btn {
    padding: var(--padding-button-3);
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
</style>