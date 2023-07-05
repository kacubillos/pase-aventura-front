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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../router';
import ScheduleService from '../../services/ScheduleService.js'

const route = useRoute();
const scheService = new ScheduleService();
const id = route.params.id;
const schedule = ref({
});

onMounted(async () => {
 
  schedule.value = await scheService.fetchOne(id);
  
})

const saveSchedule = async () => {
  const isSuccess = await scheService.update(schedule.value);
  if (isSuccess)
    router.push('/horarios');
  else
    alert('Error, verifique la información.')
}

</script>
  
  
  
  
  