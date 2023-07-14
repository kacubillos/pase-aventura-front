<template>
    <div class="row align-items-center justify-content-center m-4">
        <form class="form col-12 col-md-6 col-lg-8 m-4" @submit.prevent="saveSale">
            <fieldset :disabled="disabledForm">
                <legend class="my-3">Informacion de la venta</legend>
                <div class="mb-3">
                    <label for="idSale" class="form-label">Id</label>
                    <input type="text" class="form-control" id="idSale" v-model="props.content.saleId" disabled>
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Comprador</label>
                    <select class="form-select" id="role" v-model="props.content.customerId">
                        <option :value="cus.customerId" v-for="cus in customers" :key="cus.customerId"
                            :selected="cus.customerId == props.content.customerId">
                            {{ cus.name + ' ' + cus.lastname }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="date" class="form-label">Fecha</label>
                    <input type="datetime-local" class="form-control" id="date" v-model="props.content.date">
                </div>
                <div class="mb-3">
                    <label for="customer" class="form-label">Total</label>
                    <input type="text" class="form-control" id="customer" v-model="props.content.total" disabled>
                </div>
            </fieldset>
            <button class="btn btn-blue w-50 position-relative start-50 translate-middle-x" v-if="disabledForm"
                @click="handleForm">Editar</button>
            <div v-else class="d-flex justify-content-center">
                <button class="btn btn-dark w-25 mx-2" @click="handleForm">Cancelar</button>
                <button type="submit" class="btn btn-green w-25 mx-2">Guardar</button>
            </div>

            <div class="m-4 mt-5">
                <legend class="form-label">Entradas registradas</legend>
                <button type="button" class="btn btn-outline-primary w-50 position-relative start-50 translate-middle-x my-4" @click="getTickets(props.content.saleId)">Consultar entradas</button>
                <div class="row" v-if="!ticketsEmpty">
                    <div class="col-12 col-md-6" v-for="tick in tickets" :key="tick.ticketId">
                        <div class="card">
                            <div class="card-body d-flex flex-column align-items-center justify-content-center">
                                <h5 class="card-title">{{ tick.game.name }}</h5>
                                <p class="card-subtitle mb-2 text-muted">Numeto entrada: {{ tick.ticketId }}</p>
                                <p>{{ tick.effectiveDate.split('T')[0] }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import SaleService from '../services/SaleService';
import CustomerService from '../services/CustomerService';
import TicketService from '../services/TicketService';

const router = useRouter();
const saleService = new SaleService();
const custService = new CustomerService();
const ticketService = new TicketService();

const props = defineProps(['content']);

const disabledForm = ref(true);

const handleForm = () => disabledForm.value = !disabledForm.value;

const customers = custService.getCustomers();
const tickets = ref([]);
const ticketsEmpty = ref(true);

onMounted(async () => {
    await custService.fetchAll();
});

const getTickets = async (saleId) => {
    tickets.value = await ticketService.fetchBySale(saleId);
    ticketsEmpty.value = false;
}

const saveSale = async () => {
    const isSuccess = await saleService.update(props.content);

    if (isSuccess)
        router.push('/ventas');
    else
        console.log('Error, verifique la información.');
}
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