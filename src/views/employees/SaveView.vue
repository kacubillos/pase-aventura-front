<template>
    <div class="alert alert-danger" v-if="error.show" role="alert">
        {{ error.msg }}
    </div>
    <component :is="currentComponent" @nextStep="emmits" />
</template>

<script setup>
import { defineAsyncComponent, shallowRef, ref } from 'vue';
import EmployeeService from '../../services/EmployeeService.js';
import { useRouter } from 'vue-router';

const empService = new EmployeeService();
const router = useRouter();

let error = ref({
    show: false,
    msg: ''
});

let employee = {
    documentType: '',
    documentNum: 0,
    name: '',
    lastname: '',
    birthDate: '',
    roleId: 0
};

let account = {
    employeeId: 22,
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
        handleComponent(AccountForm);
    } else {
        let res = await empService.save(employee);

        if (res.sucessful) {
            account.employeeId = res.body.employeeId;
            account.email = data.email;
            account.password = data.password;
            account.registrationDate = new Date().toISOString();

            let resUser = await empService.registerUser(account);

            if (resUser.sucessful) {
                router.push('/empleados');
            } else {
                error.value = {
                    show: true,
                    msg: res.error
                }
            }
        } else {
            error.value = {
                show: true,
                msg: res.error
            }
        }
    }
}
</script>

<style>
.form {
    background-color: var(--white);
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.03);
    border: 1px solid #E5E7EB;
    border-radius: 10px;
    padding: 1rem;
}
</style>