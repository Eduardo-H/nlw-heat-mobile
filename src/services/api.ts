import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.123.136:4000'
});