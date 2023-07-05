<template>
    <div class="position-relative">
        <form @submit.prevent="updateCustomer">
            <div class="d-flex justify-content-center" style="margin: 3%;">
                <h1 style="align-content: center;">Edición comprador</h1>
            </div>

            <div class="form">

                <div class="d-flex justify-content-center">
                    <div class="col-sm-3" style="margin: 2%;">
                        <label for="inputnommbres" class="form-label">Id</label>
                        <input type="text" class="form-control" id="inputNombres" :disabled="true" v-model="customer.customerId"
                            style="background: #F2F2F2;">
                    </div>
                </div>

                <div class="d-flex justify-content-center">
                    <div class="col-sm-3" style="margin: 2%;">
                        <label for="inputnommbres" class="form-label">Nombres</label>
                        <input type="text" class="form-control" id="inputNombres" v-model="customer.name"
                             style="background: #F2F2F2;">
                    </div>
                </div>

                <div class="d-flex justify-content-center">
                    <div class="col-sm-3" style="margin: 2%;">
                        <label for="inputApellidos" class="form-label">Apellidos</label>
                        <input type="text" class="form-control" id="inputApellidos" v-model="customer.lastname"
                            placeholder="Apellidos" style="background: #F2F2F2;">
                    </div>
                </div>


                <div class="d-flex justify-content-center">
                    <div class="col-sm-3" style="margin: 2%;">
                        <label for="inputApellidos" class="form-label">Fecha de nacimiento</label>
                        <input type="date" class="form-control" id="inputFechaNacimiento" v-model="customer.dateBirth" style="background:#F2F2F2;">
                    </div>
                </div>

                <div class="d-flex justify-content-center">
                    <div class="col-sm-3" style="margin: 2%;">
                        <label for="inputApellidos" class="form-label">Fecha de registro</label>
                        <input type="date" class="form-control" :disabled="true" id="inputFechaNacimiento" v-model="customer.dateRegistration" style="background:#F2F2F2;">
                    </div>
                </div>

            </div>
            <div class="d-flex justify-content-center" style="margin-top: 5% ;">
                <button type="submit" class="btn btn-primary mb-3 btn-blue">
                    <v-icon name="pr-save" />
                    Guardar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CustomerService from '../../services/CustomerService';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const customerID = route.params.id;
const cusService = new CustomerService();

const customer = ref({});


onMounted(async () => {
    customer.value = await cusService.fetchOne(customerID);
});

console.log(customer)

const updateCustomer = () => {
    const res= cusService.update(customer.value);
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
.btn-blue {
    color: var(--black-1);
    padding: var(--padding-button-3);
  }
  
  .btn-blue:hover {
    background-color: var(--blue-700);
    color: var(--white);
  }
</style>

