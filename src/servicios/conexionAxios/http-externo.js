import axios from 'axios';

const httpExterno = axios.create({
  baseURL: 'https://comparador-9aa3d8c8d0b3.herokuapp.com/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpExterno;
