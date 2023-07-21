<template>
    <div class="row align-items-center justify-content-center m-4">
        <form class="form col-12 col-md-6">
            <fieldset>
                <legend class="mt-3 mb-4">Seleccion del comprador</legend>
                <div class="mb-3">
                    <label for="customer" class="form-label">Clientes</label>
                    <select class="form-select" id="customer" v-model="customerId">
                        <option :value="cus.customerId" v-for="cus in customers" :key="cus.customerId">
                            {{ cus.name + ' ' + cus.lastname }}
                        </option>
                    </select>
                    <div id="passwordHelp" class="form-text">
                        Para registrar un nuevo cliente contactese con un adminitrador
                    </div>
                </div>
                <button type="submit" class="btn btn-blue position-relative start-50 translate-middle-x my-4 px-5"
                    @click.prevent="saveSale">Guardar</button>
            </fieldset>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CustomerService from '../services/CustomerService';

const custService = new CustomerService();

const customers = custService.getCustomers();
const customerId = ref(0);

const emit = defineEmits(['nextStep']);

onMounted(async () => {
    await custService.fetchAll();
});

const saveSale = () => {
    emit('nextStep', customerId.value);
}
</script>

<style scoped>
.form-select {
    border-radius: var(--border-radius-xs);
    padding: var(--padding-button-1);
}

.form-select:hover {
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