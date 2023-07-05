import { ref } from 'vue';
import axios from 'axios';

class EmployeeService {
    constructor() {
        this.employees = ref([])
    }

    getEmployees() {
        return this.employees;
    }

    async fetchAll() {
        try {
            const res = await axios({
                method: 'get',
                url: '/employees'
            });

            this.employees.value = res.data;
        } catch (error) {
            console.log(error);
        }
    }

    async fetchOne(empId) {
        try {
            const res = await axios({
                method: 'get',
                url: '/employees/' + empId
            });

            let employee = res.data;
            employee.birthDate = employee.birthDate.split('T')[0];

            return employee;
        } catch (error) {
            console.log(error);
        }
    }

    async save(employee) {
        let result = {
            sucessful: false,
            body: {},
            error: ''
        }

        try {
            employee.birthDate = new Date().toISOString(employee.birthDate);

            const res = await axios({
                method: 'post',
                url: '/employees',
                data: employee
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

    async update(employee) {
        try {
            employee.birthDate = new Date().toISOString(employee.birthDate);

            const res = await axios({
                method: 'put',
                url: '/employees',
                data: employee
            });

            if(res.status == 200)
                return true;
            else
                return false;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteOne(empId) {
        try {
            const res = await axios({
                method: 'delete',
                url: '/employees/' + empId
            });

            if(res.data.errors)
                return false;
            else
                return true;
        } catch (error) {
            console.log('Error');
        }
    }

    async registerUser(user) {
        let result = {
            sucessful: false,
            body: {},
            error: ''
        }

        try {
            const res = await axios({
                method: 'post',
                url: '/auth/register',
                data: user
            });

            if(res.status == 201) {
                result.sucessful = true;
                result.body = res.data;
                return result;
            }
            else {
                result.error = 'Error, revise la información';
                return result;
            }
        } catch (error) {
            result.error = 'Error, revise la información';
            return result;
        }
    }
}

export default EmployeeService