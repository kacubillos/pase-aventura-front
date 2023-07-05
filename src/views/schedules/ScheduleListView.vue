<template>
  <div class="d-flex align-items-center justify-content-between mt-4">
    <h1>Horarios</h1>

    <router-link to="/horarios/nuevo" class="btn btn-outline-primary">
      <v-icon name="md-add-round" />
      <span class="d-none d-md-inline">Nuevo Horario</span>
    </router-link>
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Día de la semana</th>
          <th scope="col">Identificación del juego</th>
          <th scope="col">Hora de inicio</th>
          <th scope="col">Hora final</th>


        </tr>
      </thead>
      <tbody>
        <tr v-for="sche in schedules" :key="sche.scheduleId">
          <td>{{ sche.weekDay }}</td>
          <td>{{ sche.gameId }}</td>
          <td>{{ sche.startTime }}</td>
          <td>{{ sche.endTime }}</td>


          <td>
            <router-link :to="{ path: '/horarios/' + sche.scheduleId }" class="btn btn-primary">Editar</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
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
