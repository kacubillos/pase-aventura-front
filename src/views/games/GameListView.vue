<template>
  <div class="d-flex align-items-center justify-content-between mt-4">
    <h1>Juegos</h1>
    <router-link to="/juegos/nuevo" class="btn btn-outline-primary">
      <v-icon name="md-add-round" />
      <span class="d-none d-md-inline">Nuevo Juego</span>
    </router-link>
  </div>
    <div class="table-responsive">
      <table class="table ">
        <thead>
          <tr>
            <th scope="col">Nombre de la atracción</th>
            <th scope="col">Capacidad de pesonas</th>
            <th scope="col">Duración(min)</th>
            <th scope="col">Precio de entrada</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gam in games" :key="gam.gameId">
            <td>{{ gam.name }}</td>
            <td>{{ gam.capacityPersons }}</td>
            <td>{{ gam.duration.split(":")[1] }}</td>
            <td>{{ gam.salesPrice }}</td>
            <td>
              <router-link :to="{ path: '/juegos/' + gam.gameId }" class="btn btn-primary">Editar</router-link>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import GameService from '../../services/GameService.js';

let games = ref([])

const gamService = new GameService();
games = gamService.getGames();

onMounted(async () => {
  await gamService.fetchAll();


});


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

.btn {
  border-radius: var(--border-radius-xs);
  padding: var(--padding-button-3);
}

::placeholder {
  color: var(--neutral-text-light);
}

</style>
