import { ref } from 'vue';
import axios from 'axios';

class CustomerService {
    constructor() {
        this.customers = ref([])
    }

    getCustomers() {
        return this.customers
    }

    async fetchAll() {
        try {
            const res = await axios({
                method: 'get',
                url: '/customers'
            });
            this.customers.value = res.data;

        } catch (error) {
            console.log(error);
        }
    }

    async fetchOne(CusId) {
        try {
            const res = await axios({
                method: 'get',
                url: '/customers/' + CusId
            });

            let customer = res.data;
            customer.dateBirth = customer.dateBirth.split('T')[0];
            customer.dateRegistration = customer.dateRegistration.split('T')[0];

            return customer;
        } catch (error) {
            console.log(error);
        }
    }

    async save(customer) {
        try {
            customer.dateBirth = new Date().toISOString(customer.birthdate);
            customer.dateRegistration = new Date().toISOString();

            const res = await axios({
                method: 'post',
                url: '/customers',
                data: customer
            })

            if (res.status == 201)
                return true;
            else
                return false;
        } catch (error) {
            console.log(error);
        }

    }

    async update(customer) {
        try {
            customer.dateBirth = new Date().toISOString(customer.dateBirth);
            customer.dateRegistration = new Date().toISOString(customer.dateRegistration);

            const res = await axios({
                method: 'put',
                url: '/customers/',
                data: customer
            });

            if (res.status == 200)
                return true;
            else
                return false;
        } catch (error) {
            console.log("Error: "+error);
        }
    }

    async deleteOne(cusId) {
        try {
            const res = await axios({
                method: 'delete',
                url: '/customers/' + cusId
            });

            if (res.data.errors)
                return false;
            else
                return true;
        } catch (error) {
            console.log('Error:'+error);
        }
    }

}

export default CustomerService