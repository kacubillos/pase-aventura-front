<template>
    <form @submit.prevent="saveEmployee">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nombre de la atracción</label>
            <input type="text" v-model="game.name" class="form-control" id="exampleInputPassword1">
            
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Capacidad de personas</label>
            <input type="number" v-model="game.capacityPersons" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">duración</label>
            <input type="number" v-model="game.duration" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Precio de venta</label>
            <input type="number" v-model="game.salesPrice" class="form-control" id="exampleInputPassword1">
        </div>
        
        <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            game: {
                name: '',
                capacityPersons: 0,
                duration:0,
                salesPrice: 0,
                registrationDate:''
            }
        }
    },
    methods: {
        saveGame() {
            this.game.registrationDate = new Date().toISOString();
            axios.post('/games', this.game).then(
                response => {
                    console.log(response.status);
                    location.href = "/juegos";
                }
            );
        }
    }
}
</script>