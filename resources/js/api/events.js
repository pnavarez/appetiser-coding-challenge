import axios from 'axios';

const client = axios.create({
    baseURL: '/api',
});

export default {
    all() {
        return client.get('events');
    },
    add(data) {
        return client.post('events', data);
    },
    deleteAll() {
        return client.delete('events');
    }
};

