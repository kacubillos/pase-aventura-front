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

    async save(customer) {
        try {
            customer.dateBirth = new Date().toISOString(customer.birthdate);
            customer.dateRegistration=new Date().toISOString();

            const res = await axios({
                method: 'post',
                url: '/customers',
                data: customer
            })

            if (res.status == 201)
                return true;
            else
                return false;
        }catch(error){
            console.log(error);
        }

    }

    async update(customer) {
        try {
            customer.birthDate = new Date().toISOString(customer.birthDate);

            const res = await axios({
                method: 'put',
                url: '/customers',
                data: customer
            });

            if(res.status == 200)
                return true;
            else
                return false;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteOne(cusId) {
        try {
            const res = await axios({
                method: 'delete',
                url: '/customers/' + empId
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

export default CustomerService