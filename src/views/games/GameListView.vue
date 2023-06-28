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
            <td>{{ gam.duration }}</td>
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
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        games: []
      }
    },
    mounted: function () {
      this.getGames();
    },
    methods: {
      getGames() {
        axios.get('/games').then(
          response => {
            this.games = response.data;
          }
        );
      },
      deleteGame(gamId) {
        axios.delete('/games/' + gamId).then(
          response => {
            alert("Eliminado correctamente");
            location.href = "/juegos";
          }
        );
      }
    }
  }
  </script>