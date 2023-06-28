<template>
    <h1>Horarios</h1>
    <router-link to="/horarios/nuevo" class="btn btn-primary">Nuevo</router-link>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Hora de inicio</th>
            <th scope="col">Hora final</th>
            <th scope="col">Dia de la semana</th>
            <th scope="col">Identificación del juego</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sche in schedules" :key="sche.scheduleId">
            <td>{{ sche.startTime }}</td>
            <td>{{ sche.endTime }}</td>
            <td>{{ sche.weekDay }}</td>
            <td>{{ sche.gameId }}</td>
            <td>
              <router-link :to="{ path: '/horarios/' + sche.scheduleId }" class="btn btn-primary">Editar</router-link>
              <button class="btn btn-danger" @click="deleteGame(sche.scheduleId)">Eliminar</button>
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
        schedules: []
      }
    },
    mounted: function () {
      this.getGames();
    },
    methods: {
      getGames() {
        axios.get('/schedules').then(
          response => {
            this.schedules = response.data;
          }
        );
      },
      deleteGame(scheId) {
        axios.delete('/schedules/' + scheId).then(
          response => {
            alert("Eliminado correctamente");
            location.href = "/horarios";
          }
        );
      }
    }
  }
  </script>