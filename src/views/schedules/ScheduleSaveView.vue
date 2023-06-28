<template>
  <form @submit.prevent="saveGame">
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
  
<script>
import axios from 'axios';

export default {
  data() {
    return {

      schedule: {
        startTime: "",
        endTime: "",
        weekDay: "",
        gameId: 0
      }
    }
  },



  methods: {
    saveGame() {

      this.schedule.startTime = `${this.schedule.startTime}`
      this.schedule.endTime = `${this.schedule.endTime}`
      axios.post('/schedules', this.schedule).then(
        response => {
          console.log(response.status);
          location.href = "/horarios";
        }
      );
    }
  }
}
</script>
  