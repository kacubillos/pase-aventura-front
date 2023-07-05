import { ref } from 'vue';
import axios from 'axios';

class SaleService {
    constructor() {
        this.sales = ref([])
    }

    getSales() {
        return this.sales;
    }

    async fetchAll() {
        try {
            const res = await axios({
                method: 'get',
                url: '/sales'
            });

            this.sales.value = res.data;
        } catch (error) {
            console.log(error);
        }
    }

    async fetchOne(saleId) {
        try {
            const res = await axios({
                method: 'get',
                url: '/sales/' + saleId
            });

            let sale = res.data;

            return sale;
        } catch (error) {
            console.log(error);
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

export default SaleService