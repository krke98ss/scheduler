import axios from 'axios';

const BASE_URL = "";

axios.create({
  baseURL : BASE_URL,
  headers : {"Content-Type" : "application/json"},
})