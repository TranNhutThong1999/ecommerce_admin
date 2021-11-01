import axios from '../axios/index';

const path = "/products";
const productAPI = {
    getProducts() {
        return axios.get(`${path}.json`)
    },
    getOneProduct(id) {
        return axios.get(`${path}/${id}.json`)
    },
    removeOneProduct(id) {
        return axios.delete(`${path}/${id}.json`)
    },
    addOneProduct(product) {
        return axios.post(`${path}.json`, product);
    },
    editOneProduct(id, product) {
        return axios.patch(`${path}/${id}.json`, product);
    },
    findByName(name) {
        return axios.get(`${path}.json?orderBy="name"&equalTo="${name}"&print=pretty`)
    }

}
export default productAPI;