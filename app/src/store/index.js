import { DACharactersAPI, CacheAPI } from '../plugins/axios.js'
import { createStore } from 'vuex'

const store = createStore({
  state: () => ({
    // name: 
  }),
  // mutations: {
  // },
  actions: {
    async setToCache({state}, {key, value}) {
      try {
        let cacheKey = encodeURIComponent(btoa(key));
        let response = await CacheAPI.put(`/SET/${cacheKey}`, escape(JSON.stringify(value)));
      } catch (error) {
        console.error(error);
      }
    },
    async getFromCache({dispatch}, {key}) {
      try {
        let cacheKey = encodeURIComponent(btoa(key));
        let response = await CacheAPI.get(`/GET/${cacheKey}`);
        if (response?.data?.GET) {
          return JSON.parse(unescape(response?.data?.GET));
        } else {
          return await dispatch('getFromApi', {key});
        }
      } catch (error) {
        console.error(error);
        return await dispatch('getFromApi', {key});
      }
    },
    async getFromApi({dispatch}, {key}) {
      try {
        let response = await DACharactersAPI.get(key);
        await dispatch('setToCache', {key: key, value: response?.data});
        return response;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
})

export default store
