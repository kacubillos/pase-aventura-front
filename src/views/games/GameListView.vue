<template>
  <h1>Juegos</h1>
  <router-link to="/juegos/nuevo" class="btn btn-primary">Nuevo</router-link>
  <div class="table-responsive">
    <table class="table table-bordered">
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
            <button class="btn btn-danger" @click="deleteGame(gam.gameId)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script setup>
import {ref, onMounted} from 'vue';
import GameService from '../../services/GameService.js';

let games = ref([])

const gamService = new GameService();
games = gamService.getGames();

onMounted(async () => {
  await gamService.fetchAll();
 

});
const deleteGame = async (gamId) => {
  const res = await gamService.deleteOne(gamId);
  if (res) {
    alert('Eliminado correctamente.')
    games.value = games.value.filter(gam => gam.gameId != gamId);
  } else {
    alert('Error.')
  }
}

</script>