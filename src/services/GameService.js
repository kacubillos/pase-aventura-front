import { ref } from 'vue';
import axios from 'axios';
import moment from 'moment';

class GameService {
  constructor() {
    this.games = ref([]);
  }

  getGames() {
    return this.games;
  }

  async fetchAll() {
    try {
      const res = await axios.get('/games');
      this.games.value = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchOne(gamId) {
    try {

      const res = await axios.get('/games/' + gamId);
      let game = res.data;
      return game;
    } catch (error) {
      console.log(error);
    }
  }

  async save(game) {
    try {
      const duration = moment.duration(game.duration, 'minutes');
      game.duration = moment.utc().startOf('day').add(duration).format('HH:mm:ss');
      game.registrationDate = new Date().toISOString();
      const res = await axios({
        method: 'POST',
        url: '/games',
        data: game
      });
      if (res.status === 201)
        return true;
      else
        return false;
    } catch (error) {
      console.log(error);
    }
  }

  async update(game) {
    try {
      const duration = moment.duration(game.duration, 'minutes');
      game.duration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
      game.registrationDate = new Date().toISOString();

      const res = await axios.put('/games', game);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOne(gamId) {
    try {
      const res = await axios.delete('/games/' + gamId);
      if (res.data.errors)
        return false;
      else
        return true;
    } catch (error) {
      console.log(error);
    }
  }
}

export default GameService;