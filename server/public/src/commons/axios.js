import _axios from 'axios';

const instance = _axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000
});

export default instance;