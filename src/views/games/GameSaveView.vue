<template>
    <form @submit.prevent="saveGame">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nombre de la atracción</label>
            <input type="text" v-model="game.name" class="form-control" id="exampleInputPassword1">

        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Capacidad de personas</label>
            <input type="number" v-model="game.capacityPersons" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Duración(min)</label>
            <input type="number" v-model="game.duration" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Precio de entrada</label>
            <input type="number" v-model="game.salesPrice" class="form-control" id="exampleInputPassword1">
        </div>

        <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import GameService from '../../services/GameService.js';
const gamService = new GameService();
let game = ref({
  name: '',
  capacityPersons: 0,
  duration: '',
  salesPrice: 0,
  registrationDate: ''
});

const saveGame = () => {
  gamService.save(game.value);
}
</script>