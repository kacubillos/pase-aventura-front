import { ref } from 'vue';
import  axios  from 'axios';

class GameService {
    constructor() {
        this.games = ref([])
    }
    getGames() {
        return this.games;
    }
    async fetchAll() {
        try {
            const res = await axios({
                method: 'get',
                url: '/games'
            });
            this.games.value = res.data;
        } catch (error) {
            console.log(error)
        }
    }
    async fetchOne(gamId) {
        try {
            const res = await axios({
                method: 'get',
                url: '/games' + gamId
            });
            let game = res.data;
            return game;
        } catch (error) {
            console.log(error);
        }
    }
    async save(game) {
        try {
            game.duration = '00:' + this.game.duration + ':00'
            game.registrationDate = new Date().toISOString();
            const res = await axios({
                methos: 'post',
                url: '/games',
                data: game
            });
            if (res.status == 201)
                return true;
            else
                return false;
        } catch (error) {
            console.log(error);
        }
    }
    async update(game) {
        try {
            game.duration = '00:' + this.game.duration + ':00'
            game.registrationDate = new Date().toISOString();

            const res = await axios({
                method: 'put',
                url: '/games',
                data: game
            });
            if (res.status == 200)
                return true;
            else
                return false;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteOne(gamId) {
        try {
            const res = await axios({
                method: 'delete',
                url: '/games/' + gamId
            });

            if (res.data.errors)
                return false;
            else
                return true;
        } catch (error) {
            console.log('Error');
        }
    }
}
export default GameService