const axios = require('axios');

axios.create({
    baseURL: 'https://ifeanyi-fake-server-app.herokuapp.com'
})


module.exports = axios;