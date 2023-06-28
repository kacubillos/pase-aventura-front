<template>
  <div class="d-flex align-items-center justify-content-between mt-3">
    <h1>Empleados</h1>
    <router-link to="/empleados/nuevo" class="btn btn-primary">Nuevo</router-link>
  </div>

  <div class="d-flex align-items-center justify-content-between my-3">
    <form>
      <input type="text" class="search-form__input" placeholder="Buscar por nombre" />
      <select class="form-select">
        <option selected="">Selecciona un rol</option>
        <option value="">Administrador</option>
        <option value="">Empleado</option>
      </select>
    </form>
    <div>
      <button @click="handleLayout(CardLayout)">
        <v-icon name="md-gridview-round" />
      </button>
      <button @click="handleLayout(TableLayout)">
        <v-icon name="hi-view-list" />
      </button>
    </div>
  </div>

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

<style scoped>
  .search-form__input {
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid #c4c4c4;
  }
</style>