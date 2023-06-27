<template>
  <h1>Empleados</h1>
  <router-link to="/empleados/nuevo" class="btn btn-primary">Nuevo</router-link>

  <button @click="handleLayout(CardLayout)">Tarjetas</button>
  <button @click="handleLayout(TableLayout)">Lista</button>

  <component :is="currentlayout" :content="employees"></component>
</template>

<script setup>
  import { ref, shallowRef, defineAsyncComponent, onMounted } from 'vue';
  import EmployeeService from '../../services/EmployeeService.js';

  const TableLayout = defineAsyncComponent(() => import('../../layouts/TableLayout.vue'));
  const CardLayout = defineAsyncComponent(() => import('../../layouts/CardLayout.vue'));

  const currentlayout = shallowRef(CardLayout);

  const handleLayout = (cmp) => currentlayout.value = cmp;

  let employees = ref([])

  const empService = new EmployeeService();
  employees = empService.getEmployees();

  onMounted(async () => {
    await empService.fetchAll();
  });

  const deleteEmployee = async (empId) => {
    const res = await empService.deleteOne(empId);

    if(res) {
      alert('Eliminado correctamente.')
      employees.value = employees.value.filter(emp => emp.employeeId != empId);
    } else {
      alert('Error.')
    }
  }
</script>