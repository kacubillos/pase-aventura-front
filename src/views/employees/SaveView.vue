<template>
    <div class="alert alert-danger" v-if="error" role="alert">
        {{ errorMsg }}
    </div>
    <component :is="currentComponent" @nextStep="emmits" />
</template>

<script setup>
import { defineAsyncComponent, shallowRef, ref } from 'vue';
import EmployeeService from '../../services/EmployeeService.js';
import { useRouter } from 'vue-router';

const empService = new EmployeeService();
const router = useRouter();

let error = ref(false);
let errorMsg = ref('');

let employee = {
    documentType: '',
    documentNum: 0,
    name: '',
    lastname: '',
    birthDate: '',
    roleId: 0
};

let account = {
    employeeId: 0,
    email: '',
    password: '',
    registrationDate: ''
}

const InfoForm = defineAsyncComponent(() => import('../../components/EmployeeNewInfoForm.vue'));
const AccountForm = defineAsyncComponent(() => import('../../components/EmployeeNewAccountForm.vue'));

const currentComponent = shallowRef(InfoForm);
let infoFormSelected = true;

const handleComponent = (cmp) => {
    currentComponent.value = cmp;
    infoFormSelected = !infoFormSelected;
}

const emmits = async (data) => {
    if (infoFormSelected) {
        employee = data;
        let res = await empService.save(employee);

        if (res.sucessful) {
            employee = res.body;
            handleComponent(AccountForm);
            infoFormSelected = false;
        } else {
            error.value = true;
            errorMsg.value = res.error;
        }
    } else {
        account.employeeId = employee.employeeId;
        account.email = data.email;
        account.password = data.password;
        account.registrationDate = new Date().toISOString();

        let resUser = await empService.registerUser(account);

        if (resUser.sucessful) {
            router.push('/empleados');
        } else {
            error.value = true;
            errorMsg.value = resUser.error;
        }
    }
}
</script>

<style>
.form {
    background-color: var(--white);
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.03);
    border: 1px solid #E5E7EB;
    border-radius: var(--border-radius-md);
    padding: 1rem;
}
</style>