import { DACharactersAPI, CacheAPI } from '../plugins/axios.js'
import { createStore } from 'vuex'

const store = createStore({
  state: () => ({
    characters: []
  }),
  mutations: {
    setCharacters(state, values) {
      state.characters = values;
      // console.log(values)
    }
  },
  actions: {
    async getFromCache({dispatch, commit}, {key}) {
      try {
        let cacheKey = encodeURIComponent(btoa(key));
        let response = await CacheAPI.get(`/GET/${cacheKey}`);
        if (response?.data?.GET) {
          commit('setCharacters', JSON.parse(unescape(response?.data?.GET)));
        } else {
          commit('setCharacters', await dispatch('getFromApi', {key}));
        }
      } catch (error) {
        console.error(error);
        commit('setCharacters', await dispatch('getFromApi', {key}));
      }
    },
    async getFromApi({dispatch, commit}, {key}) {
      try {
        let response = await DACharactersAPI.get(key);
        commit(await dispatch('setToCache', {key: key, value: response?.data}));
        return response;
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
