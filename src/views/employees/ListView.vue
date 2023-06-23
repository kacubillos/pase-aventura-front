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

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: []
    }
  },
  mounted: function () {
    this.getEmployees();
  },
  methods: {
    async getEmployees() {
      const res = await axios.get('/employees');
      this.employees = res.data;
    },
    deleteEmployee(empId) {
      axios.delete('/employees/' + empId).then(
        response => {
          alert("Eliminado correctamente");
          location.href = "/empleados";
        }
      );
    }
  }
}
</script>