<template>
    <form @submit.prevent="saveEmployee">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Tipo de documento</label>
            <select class="form-select" v-model="employee.documentType" aria-label="Default select example">
                <option value="C.C">C.C</option>
                <option value="T.I">T.I</option>
            </select>
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Numero de documento</label>
            <input type="number" v-model="employee.documentNum" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Nombre</label>
            <input type="text" v-model="employee.name" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Apellido</label>
            <input type="text" v-model="employee.lastname" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Fecha de nacimiento</label>
            <input type="date" v-model="employee.birthDate" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Rol</label>
            <select class="form-select" v-model="employee.roleId" aria-label="Default select example">
                <option value="1">Administrador</option>
                <option value="2">Empleado</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import EmployeeService from '../../services/EmployeeService.js';

const empService = new EmployeeService();

let employee = ref({
    documentType: '',
    documentNum: 0,
    name: '',
    lastname: '',
    birthDate: '',
    roleId: 0
});

const saveEmployee = () => {
    empService.save(employee.value);
}
</script>