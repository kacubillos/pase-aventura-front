<template>
    <div class="alert alert-danger" v-if="error" role="alert">
        {{ errorMsg }}
    </div>
    <component :is="currentComponent" @nextStep="emmits" />
</template>

<script setup>
import { ref, defineAsyncComponent, shallowRef } from "vue";
import { useRouter } from "vue-router";
import SaleService from "../../services/SaleService";
import TicketService from "../../services/TicketService";

const saleService = new SaleService();
const ticketService = new TicketService();
const router = useRouter();

let error = ref(false);
let errorMsg = ref('');

let sale = {
    customerId: 0,
    date: '',
    total: 0
}

const SaleForm = defineAsyncComponent(() => import('../../components/SaleNewForm.vue'));
const TicketsForm = defineAsyncComponent(() => import('../../components/SaleNewTicketsForm.vue'));

const currentComponent = shallowRef(SaleForm);
let saleFormSelected = true;

const handleComponent = (cmp) => {
    currentComponent.value = cmp;
    saleFormSelected = !saleFormSelected;
}

const emmits = async (data) => {
    if (saleFormSelected) {
        sale.customerId = data;

        let res = await saleService.save(sale);

        if (res.sucessful) {
            sale = res.body;
            handleComponent(TicketsForm);
            saleFormSelected = false;
        } else {
            error.value = true;
            errorMsg.value = res.error;
        }
    } else {
        let ticketsRaw = data.tickets;
        let errors = false;

        ticketsRaw.map(async (ticket) => {
            let ticketReq = {
                customerId: sale.customerId,
                saleId: sale.saleId,
                gameId: ticket.gameId,
                effectiveDate: ticket.effectiveDate,
                price: ticket.price,
                active: true
            }

            let resTicket = await ticketService.save(ticketReq);

            if (!resTicket.sucessful) {
                errors = true;
                error.value = true;
                errorMsg.value = resTicket.error;
            }
        });

        if (errors == false) {
            sale.total = data.total;

            let resUpdateTotal = await saleService.update(sale);

            if (resUpdateTotal) {
                router.push('/ventas');
            } else {
                error.value = true;
                errorMsg.value = 'Error!!';
            }
        } else {
            error.value = true;
            errorMsg.value = 'Error!!';
        }
    }
}
</script>