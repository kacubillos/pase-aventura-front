import axios from "axios"

class InsightService {
    constructor() {
    }

    async getTicketsSoldByDate() {
        try {
            const res = await axios({
                method: 'get',
                url: '/insights/tickets-sold/filter',
                params: {
                    date: '2023-07-04'
                }
            });

            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getTotalSales() {
        try {
            const res = await axios({
                method: 'get',
                url: '/insights/total-sales',
                params: {
                    year: 2023,
                    month: 7,
                    day: 4
                }
            });

            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default InsightService