<template>
    <EmployeeCard v-for="emp in props.content" :key="emp.employeeId" :content="emp" />
</template>

<script setup>
    import EmployeeCard from '../components/EmployeeCard.vue';
    const props = defineProps(['content']);
</script>