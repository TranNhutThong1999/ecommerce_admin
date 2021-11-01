import axios from '../axios/index';

const path = "/customers";
const customerAPI = {
    getCustomers() {
        return axios.get(`${path}.json`)
    },
    getOneCustomer(id) {
        return axios.get(`${path}/${id}.json`)
    },
    addOneCustomer(customer) {
        return axios.post(`${path}.json`, customer)
    },
    editOneCustomer(id, customer) {
        return axios.patch(`${path}/${id}.json`, customer)
    },
    findByPhone(phone) {
        return axios.get(`${path}.json?orderBy="phone"&equalTo="${phone}"&print=pretty`)
    }
}
export default customerAPI;