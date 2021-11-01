import axios from '../axios/index';
const path = "/orders";
const orderAPI = {
    getOrders() {
        return axios.get(`${path}.json`)
    },
    removeOneOrder(id) {
        return axios.delete(`${path}/${id}.json`)
    },
    addOrder(order) {
        return axios.post(`${path}.json`, order)
    }
}
export default orderAPI;