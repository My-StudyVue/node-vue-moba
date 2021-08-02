import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api/rest',
  //$http.defaults.baseUrl defaults 表示默认参数
  timeout: 5000
})

export default http