<template>
  <div class="d-flex align-items-center justify-content-between mt-4">
    <h1 class="m-0">Empleados</h1>
    <router-link to="/empleados/nuevo" class="btn btn-outline-primary">
      <v-icon name="md-add-round" />
      <span class="d-none d-md-inline">Nuevo empleado</span>
    </router-link>
  </div>

  <div class="filters d-flex align-items-center justify-content-between my-5">
    <form class="search-form">
      <div class="input-group">
        <span class="input-group-text">
          <v-icon name="md-search" />
        </span>
        <input type="text" class="search-form__input" placeholder="Buscar por nombre" />
      </div>
    </form>
    <div>
      <div class="d-inline">
        <label class="select-label mx-2" for="country">Cargo:</label>
        <select id="country" class="select">
          <option selected>Ninguno</option>
          <option value="co">Admin</option>
          <option value="pe">Empleado</option>
        </select>
      </div>
      <div class="d-inline mx-3">
        <label class="select-label mx-2" for="country">Ordenar por:</label>
        <select id="country" class="select">
          <option value="co">Fecha</option>
          <option value="pe">A - Z</option>
        </select>
      </div>
      <button class="btn-icon mx-1" :class="{ 'btn-icon-active': cardViewSelected }" @click="handleLayout(CardLayout)">
        <v-icon name="md-gridview-round" />
      </button>
      <button class="btn-icon" :class="{ 'btn-icon-active': !cardViewSelected }" @click="handleLayout(TableLayout)">
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
let cardViewSelected = true;

const handleLayout = (cmp) => {
  currentlayout.value = cmp;
  cardViewSelected = !cardViewSelected;
}

let employees = ref([])

const empService = new EmployeeService();
employees = empService.getEmployees();

onMounted(async () => {
  await empService.fetchAll();
});
</script>

<style scoped>
.btn {
  border-radius: var(--border-radius-xs);
  padding: var(--padding-button-3);
}

.filters {
  background-color: var(--white);
  box-shadow: var(--shadow-sm) var(--black-900-shadow-3);
  padding: 15px 20px;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--neutral-border);
}

.input-group {
  border: 1px solid var(--neutral-border-medium);
  border-radius: var(--border-radius-xs);
  overflow: hidden;
}

::placeholder {
    color: var(--neutral-text-light);
}

.input-group:hover {
  border-color: var(--neutral-border-strong);
}

.input-group-text {
  border: none;
}

.search-form__input {
  padding: 0.7rem;
  background-color: #F9FAFB;
  border: none;
  width: 300px;
}

.search-form__input:focus {
  outline: none;
}

.select-label {
  color: var(--neutral-text-light);
}

.select {
  background: none;
  border: none;
}

.btn-icon {
  padding: 5px;
  border: none;
  border-radius: var(--border-radius-xs);
  background-color: transparent;
}

.btn-icon-active {
  background-color: #E0E7FF;
}
</style>
