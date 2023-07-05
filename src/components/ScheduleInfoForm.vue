<template>
    <form @submit.prevent="saveSchedule" class="w-100 w-md-75 mb-3">
        <fieldset :disabled="disabledDataForm">
            <legend class="my-3">Horario</legend>
            <div class="row mb-3">
                <label for="weekDay" class="form-label">Día de la semana</label>
                <select class="form-select" v-model="props.content.weekDay" id="weekDay">
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miercoles">Miercoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sabado">Sabado</option>
                    <option value="Domingo">Domingo</option>
                </select>
            </div>
            <div class="row mb-3">
                <label for="gameId" class="form-label">Identificación del juego</label>
                <input type="number" v-model="props.content.gameId" class="form-control" id="gameId">
            </div>
            <div class="row mb-3">
                <div class="col-12 col-md-6">
                    <label for="startTime" class="form-label">Hora de inicio</label>
                    <input type="time" v-model="props.content.startTime" class="form-control" id="startTime">
                </div>
                <div class="col-12 col-md-6">
                    <label for="endTime" class="form-label">Hora de finalización</label>
                    <input type="time" v-model="props.content.endTime" class="form-control" id="endTime">
                </div>
            </div>
        </fieldset>
        <button class="btn btn-blue w-50 position-relative start-50 translate-middle-x" v-if="disabledDataForm"
            @click="handleDataForm">Editar</button>
        <div v-else class="d-flex justify-content-center">
            <button class="btn btn-dark w-25 mx-2" @click="handleDataForm">Cancelar</button>
            <button type="submit" class="btn btn-green w-25 mx-2">Guardar</button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ScheduleService from '../services/ScheduleService.js';

const router = useRouter();
const scheService = new ScheduleService();

const props = defineProps(['content']);

const disabledDataForm = ref(true);

const handleDataForm = () => disabledDataForm.value = !disabledDataForm.value;

const saveSchedule = async () => {
    const isSuccess = await scheService.update(props.content);

    if (isSuccess)
        router.push('/horarios');
    else
        alert('Error, verifique la información.');
}
</script>

<style scoped>
.img-container {
    width: 200px;
    height: 200px;
    border-radius: 15px;
    overflow: hidden;
    margin: 0 auto;
    transition: 400ms;
}

.img-container>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.form-control,
.form-select {
    border-radius: var(--border-radius-xs);
    padding: var(--padding-button-1);
}

.form-control::placeholder {
    color: var(--neutral-text-light);
}

.form-control:hover,
.form-select:hover {
    border-color: var(--neutral-border-strong);
}

.btn {
    padding: var(--padding-button-2);
    border-radius: var(--border-radius-md);
}

.btn-blue {
    background-color: var(--blue-500);
    color: var(--white);
    box-shadow: var(--shadow-xs) var(--black-900-shadow-2);
}

.btn-blue:hover {
    background-color: var(--blue-600);
    color: var(--white);
    box-shadow: var(--shadow-sm) var(--black-900-shadow-3);
}

.btn-green {
    background-color: var(--green-400);
    color: var(--white);
    box-shadow: var(--shadow-xs) var(--black-900-shadow-2);
}

.btn-green:hover {
    background-color: var(--green-500);
    color: var(--white);
    box-shadow: var(--shadow-sm) var(--black-900-shadow-3);
}

.btn-dark {
    background-color: var(--white);
    color: var(--black-900);
    border: 1px solid var(--black-200);
}
</style>