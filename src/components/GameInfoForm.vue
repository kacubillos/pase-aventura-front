<template>
    <form @submit.prevent="saveGame" class="w-100 w-md-75 mb-3">
        <div class="row align-items-center justify-content-center">
            <form @submit.prevent="saveGame" class="form col-12 col-md-6 col-lg-8 m-4">
                <fieldset>
                    <div class="img-container">
                        <img src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                            alt="profile image">
                    </div>
                </fieldset>
                <fieldset>
                    <legend class="my-3">Datos del juego</legend>
                    <div class="mb-3">
                        <label for="birthDay" class="form-label">Nombre de la atracción</label>
                        <input type="text" v-model="props.content.name" class="form-control" id="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="salesPrice" class="form-label">Precio de entrada</label>
                        <input type="number" v-model="props.content.salesPrice" class="form-control" id="salesPrice" required>

                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-md-6">
                            <label for="docType" class="form-label">Duración(min)</label>
                            <input type="number" v-model="props.content.duration" class="form-control" id="duration" required>

                        </div>
                        <div class="col-12 col-md-6">
                            <label for="docNum" class="form-label">Capacidad de personas</label>
                            <input type="number" v-model="props.content.capacityPersons" class="form-control" id="capacityPersons"
                                required>
                        </div>
                    </div>
                    

                    <button type="submit"
                        class="btn btn-blue position-relative start-50 translate-middle-x my-4 px-5">Guardar</button>
                </fieldset>
            </form>
        </div>
    </form>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GameService from '../services/GameService.js';

const router = useRouter();
const gamService = new GameService();

const props = defineProps(['content']);

const disabledDataForm = ref(true);

const handleDataForm = () => disabledDataForm.value = !disabledDataForm.value;

const saveGame = async () => {
    const isSuccess = await gamService.update(props.content);
    
    if (isSuccess)
        router.push('/juegos');
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
}</style>