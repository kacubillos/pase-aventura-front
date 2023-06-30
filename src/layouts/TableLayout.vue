<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nombres</th>
                    <th scope="col">Documento de identidad</th>
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

<style scoped>
    .table {
        border-collapse: separate;
        border-spacing: 0;
        border-radius: 10px;
        border: 1px solid rgb(229, 231, 235);
    }

    .table th {
        padding: 0.7rem;
        color: rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid rgb(229, 231, 235);
    }
</style>