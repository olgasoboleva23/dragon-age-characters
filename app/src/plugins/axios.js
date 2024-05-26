import axios from 'axios'

export const CacheAPI = axios.create({
  baseURL: 'http://localhost:7379',
});

export const DACharactersAPI = axios.create({
  baseURL: 'http://localhost:3000/api/v1/characters',
});
