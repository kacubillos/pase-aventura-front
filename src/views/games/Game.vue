<template>
    <form @submit.prevent="saveGame">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nombre de la atracción</label>
            <input type="text" v-model="game.name" class="form-control" id="exampleInputPassword1">
                
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Capacidad de personas</label>
            <input type="number" v-model="game.capacityPersons" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Duración(min)</label>
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import GameService from '../../services/GameService'
const router = useRouter();
const route = useRoute();
const gamService = new GameService();
const id = route.params.id;
const game = ref({});

onMounted(async () => {
  game.value = await gamService.fetchOne(id);
  game.value.duration = game.value.duration.split(":")[1];
})

const saveGame = async () => {
  const isSuccess = await gamService.update(game.value);
  
  if (isSuccess)
    router.push('/juegos');
    
  else
    alert('Error, verifique la información.')
}

</script>
  