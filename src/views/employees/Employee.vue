<template>
    <div class="d-flex justify-content-between align-items-center my-4">
        <router-link to="/empleados" class="d-flex align-items-center justify-content-center">
            <v-icon name="bi-arrow-left-short" scale="1.5" />
            <span class="fs-6">Todos los empleados</span>
        </router-link>
        <button class="btn btn-red" data-bs-toggle="modal" data-bs-target="#modalDelete">
            <v-icon name="md-deleteforever" />
            Eliminar
        </button>
    </div>

    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start">
        <!-- Personal information form -->
        <EmployeeInfoForm :content="employee" />

        <!-- Account form -->
        <EmployeeAccountForm />
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="modalDelete" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">¿Estas seguro de eliminar este empleado?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Una vez que eliminas un empleado, no hay vuelta atrás. Por favor, esté seguro.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="deleteEmployee(employee.employeeId)">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EmployeeService from '../../services/EmployeeService.js';

import EmployeeInfoForm from '../../components/EmployeeInfoForm.vue';
import EmployeeAccountForm from '../../components/EmployeeAccountForm.vue';

const route = useRoute();
const router = useRouter();
const empService = new EmployeeService();

const id = route.params.id;
const employee = ref({});

onMounted(async () => {
    employee.value = await empService.fetchOne(id);
});

const deleteEmployee = async (empId) => {
    const res = await empService.deleteOne(empId);

    if (res) {
        router.push('/empleados');
    } else {
        alert('Error, intente de nuevo.');
        router.push('/empleados');
    }
}
</script>

<style scoped>
form {
    background-color: var(--white);
    border: 1px solid #E5E7EB;
    border-radius: 10px;
    padding: 1rem;
}

.btn-red {
    background-color: var(--red-1-soft);
    color: var(--red-1);
}

.btn-red:hover {
    background-color: var(--red-1);
    color: var(--white);
}
</style>