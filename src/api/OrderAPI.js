import axios from './axios';
const path = '/orders';
const orderAPI = {
    getOrders() {
        return axios.get(`${path}.json`);
    },
    addOrder(order) {
        return axios.post(`${path}.json`, order);
    },
    editOrder(id, value) {
        return axios.patch(`${path}/${id}.json`, value);
    },
};
export default orderAPI;