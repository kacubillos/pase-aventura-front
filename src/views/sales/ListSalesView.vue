<template>
    <div class="d-flex align-items-center justify-content-between my-4">
        <h1 class="m-0">Ventas</h1>
        <router-link to="/ventas/nuevo" class="btn btn-outline-primary">
            <v-icon name="md-add-round" />
            <span class="d-none d-md-inline">Nueva venta</span>
        </router-link>
    </div>

    <TableSalesLayout :content="sales" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TableSalesLayout from '../../layouts/TableSalesLayout.vue';
import SaleService from '../../services/SaleService';

let sales = ref([])

const saleService = new SaleService();
sales = saleService.getSales();

onMounted(async () => {
  await saleService.fetchAll();
});
</script>

<style scoped>
.btn {
    border-radius: var(--border-radius-xs);
    padding: var(--padding-button-3);
}
</style>