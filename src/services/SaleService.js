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

    async save(sale) {
        let result = {
            sucessful: false,
            body: {},
            error: ''
        }

        try {
            sale.date = new Date().toISOString();

            const res = await axios({
                method: 'post',
                url: '/sales',
                data: sale
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
            return false;
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