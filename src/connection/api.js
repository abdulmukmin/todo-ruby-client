import axios from 'axios'

export default axios.create({
    baseURL: 'https://todo-ruby-server.herokuapp.com/',
})
