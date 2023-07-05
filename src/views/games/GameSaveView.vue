<template>
    <div class="row align-items-center justify-content-center">
        <form @submit.prevent="saveGame">
            <fieldset>
                <legend class="my-3">Imagen del juego</legend>
                <div class="img-container">
                    <img src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                        alt="profile image">
                </div>
            </fieldset>
            <fieldset>
                <legend class="my-3">Datos del juego</legend>
                <div class="mb-3">
                    <label for="name" class="form-label">Nombre de la atracción</label>
                    <input type="text" v-model="game.name" class="form-control" id="exampleInputPassword1">

                </div>
                <div class="mb-3">
                    <label for="capacityPersons" class="form-label">Capacidad de personas</label>
                    <input type="number" v-model="game.capacityPersons" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3">
                    <label for="duration" class="form-label">Duración(min)</label>
                    <input type="number" v-model="game.duration" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3">
                    <label for="salesPrice" class="form-label">Precio de entrada</label>
                    <input type="number" v-model="game.salesPrice" class="form-control" id="exampleInputPassword1">
                </div>

                <button type="submit" class="btn btn-blue position-relative start-50 translate-middle-x my-4 px-5">Guardar</button>
            </fieldset>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import GameService from '../../services/GameService.js';
import { useRouter } from 'vue-router';
const router = useRouter();
const gamService = new GameService();
let game = ref({
    name: '',
    capacityPersons: 0,
    duration: '',
    salesPrice: 0,
    registrationDate: ''
});
const saveGame = () => {

    const res = gamService.save(game.value);
    if (res)
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

.form-control, .form-select {
    border-radius: var(--border-radius-xs);
    padding: var(--padding-button-1);
}

.form-control::placeholder {
    color: var(--neutral-text-light);
}

.form-control:hover, .form-select:hover {
    border-color: var(--neutral-border-strong);
}

.btn {
    padding: var(--padding-button-3);
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
</style>