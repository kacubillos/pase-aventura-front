<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Total</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <SaleRow v-for="sale in props.content" :key="sale.saleId" :content="sale" />
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import SaleRow from '../components/SaleRow.vue';
    const props = defineProps(['content']);
</script>

<style scoped>
    .table {
        border-collapse: separate;
        border-spacing: 0;
        border-radius: var(--border-radius-sm);
        border: 1px solid var(--neutral-border);
    }

    .table th {
        padding: var(--padding-button-2);
        color: var(--neutral-text-lighter);
        border-bottom: 1px solid var(--neutral-border);
    }
</style>