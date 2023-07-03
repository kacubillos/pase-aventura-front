<template>
  <form @submit.prevent="saveSchedule">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Hora de inicio</label>
      <input type="time" v-model="schedule.startTime" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Hora final</label>
      <input type="time" v-model="schedule.endTime" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Día de la semana</label>
      <input type="text" v-model="schedule.weekDay" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Identificación del juego</label>
      <input type="number" v-model="schedule.gameId" class="form-control" id="exampleInputPassword1">
    </div>
    <button type="submit" class="btn btn-primary">Guardar</button>
  </form>
</template>
  

<script setup>
import { ref } from 'vue';
import ScheduleService from '../../services/ScheduleService.js';
const scheService = new ScheduleService();
let schedule = ref({
  startTime: "",
  endTime: "",
  weekDay: "",
  gameId: 0
});
const saveSchedule = () => {
  scheService.save(schedule.value);
}

</script>
  