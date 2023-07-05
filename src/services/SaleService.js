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
}

export default SaleService