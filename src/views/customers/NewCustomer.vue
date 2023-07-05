<template>
    <div class="position-relative">
        <form @submit.prevent="saveCustomer">
            <div class="d-flex justify-content-center" style="margin: 3%;">
                <h1 style="align-content: center;">Nuevo comprador</h1>
            </div>

            <div class="form">

                <div class="d-flex justify-content-center">
                    <div class="col-sm-3" style="margin: 2%;">
                        <label for="inputnommbres" class="form-label">Nombres</label>
                        <input type="text" class="form-control" v-model="customer.name" id="inputNombres"
                            placeholder="Nombres" style="background: #F2F2F2;">
                    </div>
                </div>

                <div class="d-flex justify-content-center">
                    <div class="col-sm-3" style="margin: 2%;">
                        <label for="inputApellidos" class="form-label">Apellidos</label>
                        <input type="text" class="form-control" v-model="customer.lastname" id="inputApellidos"
                            placeholder="Apellidos" style="background: #F2F2F2;">
                    </div>
                </div>


                <div class="d-flex justify-content-center">
                    <div class="col-sm-3" style="margin: 2%;">
                        <label for="inputApellidos" class="form-label">Fecha de nacimiento</label>
                        <input type="date" class="form-control" v-model="customer.dateBirth" id="inputFechaNacimiento"
                            style="background:#F2F2F2;">
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center" style="margin-top: 5% ;">
                <button type="submit" class="btn btn-primary mb-3">
                    <v-icon name="pr-save" />
                    Guardar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CustomerService from '../../services/CustomerService';

const router = useRouter();

const cusService = new CustomerService();

let customer = ref({
    name: '',
    lastname: '',
    dateBirth: '',
    dateRegistration: ''
});

const saveCustomer = () => {
    const res = cusService.save(customer.value);
    if (res) {
        alert('creado con exito.');
        router.push('/compradores');
    } else {
        alert('Error, intente de nuevo.');
        router.push('/compradores/nuevo');
    }
}
</script>

<style>
.form {
    background-color: var(--white);
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.03);
    border: 1px solid #E5E7EB;
    border-radius: 20px;
}
</style>