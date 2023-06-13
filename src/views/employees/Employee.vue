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

<script>
import axios from 'axios';

export default {
    data() {
        return {
            id: this.$route.params.id,
            employee: {}
        }
    },
    mounted: function() {
        axios.get('/employees/' + this.id).then(
            response => {
                this.employee = response.data;
                this.employee.birthDate = this.employee.birthDate.split('T')[0];
            }
        );
    },
    methods: {
        saveEmployee() {
            this.employee.birthDate = new Date().toISOString(this.employee.birthDate);
            axios.put('/employees', this.employee).then(
                response => {
                    console.log(response.status);
                    location.href = "/empleados";
                }
            );
        }
    }
}
</script>