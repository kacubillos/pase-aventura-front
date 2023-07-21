<template>
    <div class="row justify-content-center align-items-center">
        <form @submit.prevent="updateCustomer" class="form col-12 col-md-6 mb-3 mt-4">
            <div class="d-flex justify-content-center my-3" style="margin: 3%;">
                <h1>Comprador</h1>
            </div>

                <div class="mb-3" style="margin: 2%;">
                    <label for="inputnommbres" class="form-label">Id</label>
                    <input type="text" class="form-control" id="inputNombres" :disabled="true" v-model="customer.customerId"
                        style="background: #F2F2F2;">
                </div>

                <div class="mb-3" style="margin: 2%;">
                    <label for="inputnommbres" class="form-label">Nombres</label>
                    <input type="text" class="form-control" id="inputNombres" v-model="customer.name"
                        style="background: #F2F2F2;">
                </div>

                <div class="mb-3" style="margin: 2%;">
                    <label for="inputApellidos" class="form-label">Apellidos</label>
                    <input type="text" class="form-control" id="inputApellidos" v-model="customer.lastname"
                        placeholder="Apellidos" style="background: #F2F2F2;">
                </div>


                <div class="mb-3" style="margin: 2%;">
                    <label for="inputApellidos" class="form-label">Fecha de nacimiento</label>
                    <input type="date" class="form-control" id="inputFechaNacimiento" v-model="customer.dateBirth"
                        style="background:#F2F2F2;">
                </div>

                <div class="mb-3" style="margin: 2%;">
                    <label for="inputApellidos" class="form-label">Fecha de registro</label>
                    <input type="date" class="form-control" :disabled="true" id="inputFechaNacimiento"
                        v-model="customer.dateRegistration" style="background:#F2F2F2;">
                </div>

                <button type="submit" class="btn btn-blue w-50 position-relative start-50 translate-middle-x my-4" v-if="auth.currentUser.role == 'ADMIN'">
                    Guardar
                </button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CustomerService from '../../services/CustomerService';
import { useRoute, useRouter } from 'vue-router';
import useAuthStore from '../../store/auth';

const router = useRouter();
const route = useRoute();
const customerID = route.params.id;
const cusService = new CustomerService();
const auth = useAuthStore();

const customer = ref({});


onMounted(async () => {
    customer.value = await cusService.fetchOne(customerID);
});

const updateCustomer = () => {
    const res = cusService.update(customer.value);
    if (res) {
        alert('actualizado con exito.');
        router.push('/compradores');
    } else {
        alert('Error, intente de nuevo.');
        router.push('/compradores');
    }
}


</script>

<style scoped>
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
</style>

