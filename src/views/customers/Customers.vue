<template>
  <div class="position-relative" style="margin-top: 1.5%;">
    <div class="position-relative top-0 start-0">
      <h2>Compradores</h2>

      <div style="margin-top: 3%;" class="row g-3 ">
        <div class="input-group mb-3 col-sm">

          <label class="input-group-text" for="inputGroupSelect01">
            <v-icon name="co-search" />
          </label>

          <input type="text" class="form-control btn-sm" placeholder="" aria-label="Nombre de usuario"
            aria-describedby="basic-addon1">

          <button class="btn btn-outline-secondary" type="button" id="button-addon1">
            <v-icon name="co-search" />
          </button>
        </div>

        <div class="dropdown col-sm ">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
            data-bs-toggle="dropdown" aria-expanded="false">
            <v-icon name="la-filter-solid" />
            filtros

          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" style="fo">
            <li><a class="dropdown-item" href="#">Id</a></li>
            <li><a class="dropdown-item" href="#">FNombre</a></li>
            <li><a class="dropdown-item" href="#">Apellido</a></li>
            <li><a class="dropdown-item" href="#">Fecha de nacimiento</a></li>
            <li><a class="dropdown-item" href="#">Fecha de registro</a></li>
          </ul>
        </div>
      </div>


    </div>
    <div class="position-absolute top-0 end-0" style="margin-top: 1%;">
      <router-link to="/compradores/nuevo" class="btn btn-primary mb-3">
        <v-icon name="la-user-plus-solid" />
        Nuevo comprador
      </router-link>
    </div>
  </div>
  <div>
    <div class="table-responsive-xl" style="margin-top: 2%;">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Fecha nacimiento</th>
            <th scope="col">Fecha registro</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cus, i in customers" :key="cus.customerId">
            <td>{{ cus.customerId }}</td>
            <td>{{ cus.name }}</td>
            <td>{{ cus.lastname }}</td>
            <td>{{ cus.dateBirth }}</td>
            <td>{{ cus.dateRegistration }}</td>
            <td>
              <button type="button" class="btn btn-red" @click="deleteCustomer(cus.customerId)">
                <v-icon name="bi-trash" />
                Eliminar
              </button>
              <router-link :to="{ path: '/compradores/editar/' + cus.customerId }" class="btn btn-darkgoldenrod">
                <v-icon name="la-user-edit-solid" />
                Editar
              </router-link>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>

  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <a class="page-link">Anterior</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Siguiente</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CustomerService from '../../services/CustomerService.js';

const router = useRouter();

let customers = ref([])

const cusService = new CustomerService();
customers = cusService.getCustomers();

onMounted(async () => {
  await cusService.fetchAll();
});

const deleteCustomer = async (customerId) => {
  const res = await cusService.deleteOne(customerId)

  if (res) {
    alert('Eliminado con exito.');
    router.push('/compradores');
  } else {
    alert('Error, intente de nuevo.');
    router.push('/compradores');
  }

};

</script>

<style scoped>
.btn-red {
  color: var(--black-1);
}

.btn-red:hover {
  background-color: var(--red-1);
  color: var(--white);
}

.btn-barkgoldenrod {
  color: var(--black-1);
}

.btn-darkgoldenrod:hover {
  background-color: rgba(128, 120, 14, 0.801);
  color: var(--white);
}
</style>
  