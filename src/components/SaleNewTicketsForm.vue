<template>
    <div class="row align-items-center justify-content-center m-4">
        <form class="form col-12 col-md-6">
            <div class="d-flex align-items-center justify-content-between mt-4 mx-3">
                <h1 class="title my-3">Registro de entradas</h1>
                <button class="btn btn-soft-blue" @click.prevent="handleForm">
                    <v-icon name="md-add-round" />
                </button>
            </div>

            <!-- Show Tickets -->
            <div class="my-4 px-5" v-if="formDisabled">
                <div class="row" v-if="tickets.length != 0">
                    <div class="col-12" v-for="tick in tickets" :key="tick.ticketId">
                        <div class="card mb-3">
                            <div class="card-body d-flex flex-column align-items-start justify-content-center">
                                <h5 class="card-title">{{ tick.gameName }}</h5>
                                <p class="card-subtitle mb-2 text-muted">{{ tick.customerName }}</p>
                                <div class="d-flex justify-content-between align-items-end w-100">
                                    <p class="price">{{ COP.format(tick.price) }}</p>
                                    <p class="card-subtitle mb-1 text-muted">{{ tick.effectiveDate.split('T')[0] + ' ' + tick.effectiveDate.split('T')[1] }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-blue position-relative start-50 translate-middle-x my-4 w-100"
                            @click.prevent="finish">
                            Finalizar
                        </button>
                    </div>
                </div>
                <div v-else>
                    <p class="alert alert-empty text-center">No se ha registrado ninguna entrada</p>
                </div>
            </div>

            <!-- Ticket form -->
            <fieldset v-else>
                <legend class="my-3 subtitle">Nueva entrada</legend>
                <div class="mb-3">
                    <label for="customer" class="form-label">Cliente</label>
                    <select class="form-select" id="customer" v-model="customerId">
                        <option :value="cus.customerId" v-for="cus in customers" :key="cus.customerId">
                            {{ cus.name + ' ' + cus.lastname }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="customer" class="form-label">Juego</label>
                    <select class="form-select" id="customer" v-model="gameId">
                        <option :value="game.gameId" v-for="game in games" :key="game.gameId">
                            {{ game.name }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="date" class="form-label">Fecha</label>
                    <input type="datetime-local" class="form-control" id="date" v-model="date">
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-dark w-25 mx-2" @click="handleForm">Cancelar</button>
                    <button type="submit" class="btn btn-green w-25 mx-2" @click.prevent="saveTicket">Guardar</button>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CustomerService from '../services/CustomerService';
import GameService from '../services/GameService';

const emit = defineEmits(['nextStep']);

const custService = new CustomerService();
const gameService = new GameService();

const customers = custService.getCustomers();
const games = gameService.getGames();

const customerId = ref(0);
const gameId = ref(0);
const date = ref('');

const total = ref(0);
const tickets = ref([]);

const formDisabled = ref(true);

const handleForm = () => formDisabled.value = !formDisabled.value;

let COP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
});

onMounted(async () => {
    await custService.fetchAll();
    await gameService.fetchAll();
});

const saveTicket = async () => {
    let gamesAux = games.value;
    let game = gamesAux.filter(game => game.gameId == gameId.value)[0];

    let customersAux = customers.value;
    let customer = customersAux.filter(cust => cust.customerId == customerId.value)[0];

    tickets.value.push({
        customerId: customerId.value,
        customerName: customer.name + ' ' + customer.lastname,
        gameId: gameId.value,
        gameName: game.name,
        effectiveDate: date.value,
        price: game.salesPrice
    });
    total.value = total.value + game.salesPrice;

    handleForm();

    // Reset form inputs
    customerId.value = 0;
    gameId.value = 0;
    date.value = '';
}

const finish = () => {
    emit('nextStep', { total: total.value, tickets: tickets.value });
}
</script>

<style scoped>
.title {
    font-size: 1.5rem;
}

.subtitle {
    font-size: 1.3rem;
    color: var(--neutral-title);
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

.btn-soft-blue {
    background-color: var(--blue-100);
    color: var(--blue-400);
    transition: var(--transition-short-bounce);
}

.btn-soft-blue:hover {
    background-color: var(--blue-400);
    color: var(--white);
    box-shadow: var(--shadow-sm) var(--blue-500-shadow);
    transform: translateY(1px);
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

.btn-dark:hover {
    background-color: var(--black-500);
    color: var(--white);
    border: 1px solid var(--black-200);
}

.alert-empty {
    font-size: 1.1rem;
    background-color: var(--red-100);
    color: var(--red-400);
    box-shadow: var(--shadow-sm) var(--red-500-shadow);
}

.price {
    font-size: 1.75rem;
    color: var(--neutral-text-title);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
}

.card {
    background-color: var(--black-900-shadow-2);
    box-shadow: var(--shadow-sm) var(--black-900-shadow-2);
    border: 1px solid var(--neutral-border);
}
</style>