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
        border-radius: var(--border-radius-sm);
        border: 1px solid var(--neutral-border);
    }

    .table th {
        padding: var(--padding-button-2);
        color: var(--neutral-text-lighter);
        border-bottom: 1px solid var(--neutral-border);
    }
</style>