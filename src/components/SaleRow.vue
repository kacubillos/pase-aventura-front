<template>
    <tr>
        <td>
            <p class="ms-2">
                {{ props.content.saleId }}
            </p>
        </td>
        <td>
            <router-link class="mx-3" :to="{ path: '/compradores/' + props.content.customerId }">
                {{ getCustomerName(props.content.customerId) }}
            </router-link>
        </td>
        <td>{{ props.content.date.split('T')[0] }}</td>
        <td>{{ props.content.date.total == null ? 0 : props.content.date.total }}</td>
        <td>
            <router-link class="btn btn-green mx-3" :to="{ path: '/ventas/' + props.content.saleId }">
                <v-icon name="fa-regular-edit" />
                Editar
            </router-link>
        </td>
    </tr>
</template>

<script setup>
import { onMounted } from 'vue';
import CustomerService from '../services/CustomerService.js';

const custService = new CustomerService();
const props = defineProps(['content']);
const custs = custService.getCustomers();

onMounted(async () => {
    await custService.fetchAll();
});

const getCustomerName = (idCustomer) => {
    let customers = custs.value;
    customers = customers.filter(customer => customer.customerId == idCustomer);
    if (customers[0] != undefined)
        return customers[0].name + ' ' + customers[0].lastname;
}
</script>

<style scoped>
td {
    padding: 1rem;
    border: none;
    border-top: 1px solid rgba(229, 231, 235, 0.5);
    ;
}

.btn {
    border-radius: var(--border-radius-md);
    padding: var(--padding-button-1);
}

.btn-green {
    background-color: var(--green-100);
    color: var(--green-600);
    transition: var(--transition-short-bounce);
}

.btn-green:hover {
    background-color: var(--green-600);
    color: var(--white);
    box-shadow: var(--shadow-sm) var(--black-900-shadow-3);
    transform: translateY(1px);
}
</style>