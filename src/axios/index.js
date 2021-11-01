import axios from "axios";
export default axios.create({
    baseURL: 'https://react-822e9-default-rtdb.firebaseio.com',
    headers: {
        "Content-type": "application/json"
    }
})