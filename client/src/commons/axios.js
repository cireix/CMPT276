import _axios from 'axios';

const instance = _axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000
});

export default instance;