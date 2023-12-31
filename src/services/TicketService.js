import { ref } from 'vue';
import axios from 'axios';

class TicketService {
    constructor() {
        this.tickets = ref([])
    }

    getTickets() {
        return this.tickets;
    }

    async fetchAll() {
        try {
            const res = await axios({
                method: 'get',
                url: '/tickets'
            });

            this.tickets.value = res.data;
        } catch (error) {
            console.log(error);
        }
    }

    async fetchOne(ticketId) {
        try {
            const res = await axios({
                method: 'get',
                url: '/tickets/' + ticketId
            });

            let ticket = res.data;

            return ticket;
        } catch (error) {
            console.log(error);
        }
    }

    async fetchBySale(saleId) {
        try {
            const res = await axios({
                method: 'get',
                url: '/tickets/sale/' + saleId
            });

            let tickets = res.data;

            return tickets;
        } catch (error) {
            console.log(error);
        }
    }

    async save(ticket) {
        let result = {
            sucessful: false,
            body: {},
            error: ''
        }

        try {
            const res = await axios({
                method: 'post',
                url: '/tickets',
                data: ticket
            });

            if(res.status == 201) {
                result.sucessful = true;
                result.body = res.data;
                return result;
            } else {
                result.error = 'Error, revise la información';
                return result;
            }
        } catch (error) {
            result.error = 'Error, revise la información';
            return result;
        }
    }

    async update(sale) {
        try {
            const res = await axios({
                method: 'put',
                url: '/sales',
                data: sale
            });

            if(res.status == 200)
                return true;
            else
                return false;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteOne(saleId) {
        try {
            const res = await axios({
                method: 'delete',
                url: '/sales/' + saleId
            });

            if(res.data.errors)
                return false;
            else
                return true;
        } catch (error) {
            console.log('Error');
        }
    }
}

export default TicketService