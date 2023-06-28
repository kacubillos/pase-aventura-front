<template>
    <form @submit.prevent="saveGame">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nombre de la atracción</label>
            <input type="text" v-model="game.name" aria-label="Default select example">
                
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

<script>
import axios from 'axios';

export default {
    data() {
        return {
            id: this.$route.params.id,
            game: {}
        }
    },
    mounted: function() {
        axios.get('/games/' + this.id).then(
            response => {
                this.game = response.data;
            }
        );
    },
    methods: {
        saveGame() {
            this.game.duration = '00:'+this.game.duration+':00'
            this.game.registrationDate = new Date().toISOString();
            axios.put('/games', this.game).then(
                response => {
                    console.log(response.status);
                    location.href = "/games";
                }
            );
        }
    }
}
</script>