<template>
    <h1>Reportes</h1>
    <div class="row w-75">
        <div class="col-12 col-md-4">
            <div class="card card-blue">
                <div class="d-flex">
                    <h3 class="title-min">Ventas</h3>
                </div>
                <p class="value">{{ COP.format(sales.totalSales) }}</p>
            </div>
        </div>
        <div class="col-12 col-md-4">
            <div class="card">
                <h3 class="title-min">Entradas vendidas</h3>
                <p class="value">{{ sales.totalSales }}</p>
            </div>
        </div>
        <div class="col-12 col-md-4">
            <div class="card">
                <h3 class="title-min">Juego mas vendido</h3>
                <p class="value">{{ mostSaledGame.name }}</p>
            </div>
        </div>
    </div>
    <div class="w-75 p-5">
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import InsightService from '../services/InsightService';
import { watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

let labels = ref([]);
let values = ref([]);

let chartData = ref({
    labels: ['January', 'February', 'March'],
    datasets: [{ data: [40, 20, 22] }]
})

let chartOptions = ref({
    responsive: true
})

const insightService = new InsightService();

let COP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
});

const salesDate = ref('');
const sales = ref({});
const tickets = ref({});
const mostSaledGame = ref({});

onMounted(async () => {
    sales.value = await insightService.getTotalSales();
    tickets.value = await insightService.getTicketsSoldByDate();
    mostSaledGame.value = tickets.value[0];

    tickets.value.map((row) => {
        labels.value.push(row.name);
        values.value.push(row.ticketsSold);
    });

    chartData.value = {
        labels: labels.value,
        datasets: [{ data: values.value }]
    }
});

watch(salesDate, () => console.log(salesDate));
</script>

<style scoped>
.card {
    padding: var(--padding-button-3);
    box-shadow: var(--shadow-sm) var(--black-900-shadow-2);
    border: 1px solid var(--neutral-border);
    border-radius: var(--border-radius-sm);
}

.card-blue {
    background-color: var(--white);
}

.title-min {
    font-size: 1rem;
    color: var(--neutral-text);
}

.value {
    font-size: 1.75rem;
    color: var(--neutral-text-title);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>