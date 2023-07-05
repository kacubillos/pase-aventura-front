<template>
  <div class="d-flex justify-content-between align-items-center my-4">
      <router-link to="/horarios" class="d-flex align-items-center justify-content-center">
          <v-icon name="bi-arrow-left-short" scale="1.5" />
          <span class="fs-6">Todos los horarios</span>
      </router-link>
      <button class="btn btn-red" data-bs-toggle="modal" data-bs-target="#modalDelete">
          <v-icon name="md-deleteforever" />
          Eliminar
      </button>
  </div>

  <div class="d-flex flex-column flex-md-row justify-content-between align-items-start">
      
      <ScheduleInfoForm :content="schedule" />
  </div>

  <!-- Modal -->
  <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="modalDelete" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">¿Seguro de eliminar el horario?</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                    Una vez se eliminado, no hay vuelta atrás.Estás seguro?.
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" class="btn btn-red-dark" @click="deleteSchedule(schedule.scheduleId)">Eliminar</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ScheduleService from '../../services/ScheduleService.js';

import ScheduleInfoForm from '../../components/ScheduleInfoForm.vue';


const route = useRoute();
const scheService = new ScheduleService();

const id = route.params.id;
const schedule = ref({});

onMounted(async () => {
  schedule.value = await scheService.fetchOne(id);
});

const deleteSchedule = async (scheId) => {
  const res = await scheService.deleteOne(scheId);

  if (res) {
      window.location = '/horarios'
  } else {
      alert('Error, intente de nuevo.');
      window.location = '/horarios'
  }
}
</script>

<style scoped>
form {
  background-color: var(--white);
  border: 1px solid var(--neutral-border);
  border-radius: var(--border-radius-md);
  padding: 1rem;
}


.btn {
    border-radius: var(--border-radius-md);
    padding: var(--padding-button-3);
}
.btn-red {
    background-color: var(--red-100);
    color: var(--red-400);
    transition: var(--transition-short-bounce);
}

.btn-red:hover {
    background-color: var(--red-400);
    color: var(--white);
    box-shadow: var(--shadow-sm) var(--red-500-shadow);
    transform: translateY(1px);
}


.btn-red-dark {
    color: var(--white);
    background-color: var(--red-400);
    transition: var(--transition-short-bounce);
}

.btn-red-dark:hover {
    color: var(--white);
    background-color: var(--red-400);
    box-shadow: var(--shadow-xs) var(--red-500-shadow);
    transform: scale(1.05);
}

.btn-light {
    border: 1px solid var(--neutral-border-medium);
    transition: var(--transition-short-bounce);
}

.btn-light:hover {
    background-color: var(--black-900-shadow-2);
    box-shadow: var(--shadow-xs) var(--black-900-shadow-2);
    transform: scale(1.05);
}
</style>


  
  