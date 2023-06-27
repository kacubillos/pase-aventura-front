<template>
  <h1>Empleados</h1>
  <router-link to="/empleados/nuevo" class="btn btn-primary">Nuevo</router-link>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Tipo documento</th>
          <th scope="col">Numero documento</th>
          <th scope="col">Nombres</th>
          <th scope="col">Apellido</th>
          <th scope="col">Fecha de nacimiento</th>
          <th scope="col">Rol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.employeeId">
          <th scope="row">{{ emp.documentType }}</th>
          <td>{{ emp.documentNum }}</td>
          <td>{{ emp.name }}</td>
          <td>{{ emp.lastname }}</td>
          <td>{{ emp.birthDate }}</td>
          <td>{{ emp.role.name }}</td>
          <td>
            <router-link :to="{ path: '/empleados/' + emp.employeeId }" class="btn btn-primary">Editar</router-link>
            <button class="btn btn-danger" @click="deleteEmployee(emp.employeeId)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import EmployeeService from '../../services/EmployeeService.js';

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