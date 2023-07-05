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
  
  <script setup>
  import {ref, onMounted} from 'vue';
  import ScheduleService from '../../services/ScheduleService.js';
  
  let schedules = ref([])
  
  const scheService = new ScheduleService();
  schedules = scheService.getSchedules();
  
  onMounted(async () => {
    await scheService.fetchAll();
  });
  const deleteGame = async (scheId) => {
    const res = await scheService.deleteOne(scheId);
    if (res) {
      alert('Eliminado correctamente.')
      schedules.value = schedules.value.filter(sche => sche.scheId != scheId);
    } else {
      alert('Error.')
    }
  }
  
  </script>