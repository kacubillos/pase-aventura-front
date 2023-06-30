<template>
    <div class="d-flex justify-content-center">
        <form @submit.prevent="saveCustomer">
            <div class="d-flex justify-content-center" style="margin: 10%;">
                <h1 style="align-content: center;">Nuevo comprador</h1>
            </div>
            <div style="margin: 10%;"></div>
            <form class="row g-3">
                <div class="col-auto">
                    <label for="inputnommbres" class="visually-hidden">Nombres</label>
                    <input type="text" class="form-control" v-model="customer.name" id="inputNombres" placeholder="Nombres"
                        style="background: #F2F2F2;">
                </div>
            </form>
            <form class="row g-3">
                <div style="margin-top: 5%;"></div>
                <div class="col-auto">
                    <label for="inputApellidos" class="visually-hidden">Apellidos</label>
                    <input type="text" class="form-control" v-model="customer.lastname" id="inputApellidos" placeholder="Apellidos"
                        style="background: #F2F2F2;">
                </div>
            </form>
            <form class="row g-3">
                <div style="margin-top: 5%;"></div>
                <div class="col-auto">
                    <label for="inputFechaNacimiento" class="visually-hidden">inputFechaNacimiento</label>
                    <input type="date" class="form-control" v-model="customer.dateBirth" id="inputFechaNacimiento" style="background:#F2F2F2;">
                </div>
            </form>

            <div class="d-flex justify-content-center" style="margin: 20%;">
                <button type ="submit" class="btn btn-primary mb-3">
                    <v-icon name="la-save-solid" />
                    Guardar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomerService from '../../services/CustomerService';

const cusService = new CustomerService();

let customer = ref({
    name: '',
    lastname: '',
    dateBirth: '',
    dateRegistration: ''
});

const saveCustomer = () => {
    cusService.save(customer.value);
}
</script>
    