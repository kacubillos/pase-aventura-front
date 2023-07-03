import { ref } from 'vue';
import  axios  from 'axios';

class ScheduleService {
    constructor() {
        this.schedules = ref([])
    }
    getSchedule() {
        return this.schedules;
    }
    async fetchAll() {
        try {
            const res = await axios({
                method: 'get',
                url: '/schedules'
            });
            this.schedules.value = res.data;
        } catch (error) {
            console.log(error)
        }
    }
    async fetchOne(scheId) {
        try {
            const res = await axios({
                method: 'get',
                url: '/schedules' + scheId
            });
            let schedule = res.data;
            return schedule;
        } catch (error) {
            console.log(error);
        }
    }
    async save(schedule) {
        try {
            const res = await axios({
                methos: 'post',
                url: '/schedules',
                data: schedule
            });
            if (res.status == 201)
                return true;
            else
                return false;
        } catch (error) {
            console.log(error);
        }
    }
    async update(schedule) {
        try {
            const res = await axios({
                method: 'put',
                url: '/schedules',
                data: schedule
            });
            if (res.status == 200)
                return true;
            else
                return false;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteOne(scheId) {
        try {
            const res = await axios({
                method: 'delete',
                url: '/schedules/' + scheId
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
export default ScheduleService