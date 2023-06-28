<template>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Tipo documento</th>
                    <th scope="col">Numero documento</th>
                    <th scope="col">Nombres</th>
                    <th scope="col">Fecha de nacimiento</th>
                    <th scope="col">Rol</th>
                </tr>
            </thead>
            <tbody>
                <EmployeeRow v-for="emp in props.content" :key="emp.employeeId" :content="emp"></EmployeeRow>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import EmployeeRow from '../components/EmployeeRow.vue';
    const props = defineProps(['content']);
</script>