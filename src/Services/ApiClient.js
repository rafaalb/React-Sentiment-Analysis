import axios from 'axios';
import Config from './../config';

const api = axios.create({
  baseURL: `${Config.api.cors}${Config.api.url}`,
  timeout: 20000,
});

const getQuote = ({ key }) => {
  return api
    .get(`?method=getQuote&format=${Config.api.format}&lang=${Config.api.lang}&key=${key}`)
    .then(response => response);
}
export default {
  getQuote
}
