import { DACharactersAPI, CacheAPI } from '../plugins/axios.js'
import { createStore } from 'vuex'

const store = createStore({
  state: () => ({
    characters: [],
    perPage: 25,
    page: 1
  }),
  mutations: {
    setCharacters(state, values) {
      state.characters = values;
    },
    setPerPage(state, value) {
      state.perPage = value;
    },
    setPage(state, value) {
      state.page = value;
    },
  },
  actions: {
    async getFromCacheOneCharacterDetails({dispatch, commit}, {key}) {
      return await dispatch('getFromCache', {key});
    },
    async getFromCacheCharacters({dispatch, commit}, {key}) {
      commit('setCharacters', await dispatch('getFromCache', {key}));
    },
    async getFromCache({dispatch, commit}, {key}) {
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
    async getFromApi({dispatch, commit}, {key}) {
      try {
        let response = await DACharactersAPI.get(key);
        await dispatch('setToCache', {key: key, value: response?.data});
        return response?.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async setToCache({state}, {key, value}) {
      try {
        let cacheKey = encodeURIComponent(btoa(key));
        let response = await CacheAPI.put(`/SET/${cacheKey}`, escape(JSON.stringify(value)));
      } catch (error) {
        console.error(error);
      }
    },
  },
})

export default store
