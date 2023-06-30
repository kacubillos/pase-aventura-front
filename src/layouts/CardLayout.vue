<template>
    <div class="row">
        <div class="col-12 col-md-4 col-lg-3" v-for="emp in props.content">
            <EmployeeCard :key="emp.employeeId" :content="emp" />
        </div>
    </div>
</template>

<script setup>
    import EmployeeCard from '../components/EmployeeCard.vue';
    const props = defineProps(['content']);
</script>