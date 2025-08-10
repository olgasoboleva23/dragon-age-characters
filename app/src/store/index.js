import { DACharactersAPI, CacheAPI } from '../plugins/axios.js'
import { createStore } from 'vuex'

// Helper function for cache key encoding
function encodeCacheKey(key) {
  return encodeURIComponent(btoa(key));
}

const store = createStore({
  state: () => ({
    characters: [],
    perPage: 24,
    page: 1,
    loading: false,
    error: null
  }),
  mutations: {
    setCharacters(state, characters) {
      state.characters = characters;
    },
    setPerPage(state, perPage) {
      state.perPage = perPage;
    },
    setPage(state, page) {
      state.page = page;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  getters: {
    hasError: state => !!state.error,
    isLoading: state => state.loading
  },
  actions: {
    async getFromCacheOneCharacterDetails({ dispatch }, { key }) {
      return await dispatch('getFromCache', { key });
    },
    
    async getFromCacheCharacters({ commit, dispatch }, { key }) {
      commit('setLoading', true);
      commit('clearError');
      
      try {
        const characters = await dispatch('getFromCache', { key });
        commit('setCharacters', characters);
        return characters;
      } catch (error) {
        commit('setError', error.message || 'Failed to fetch characters');
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
    
    async getFromCache({ dispatch }, { key }) {
      try {
        const cacheKey = encodeCacheKey(key);
        const response = await CacheAPI.get(`/GET/${cacheKey}`);
        
        if (response?.data?.GET) {
          return JSON.parse(unescape(response.data.GET));
        }
        
        return await dispatch('getFromApi', { key });
      } catch (error) {
        console.error('Cache retrieval failed:', error);
        return await dispatch('getFromApi', { key });
      }
    },
    
    async getFromApi({ dispatch }, { key }) {
      try {
        const response = await DACharactersAPI.get(key);
        const data = response?.data;
        
        if (data) {
          await dispatch('setToCache', { key, value: data });
        }
        
        return data;
      } catch (error) {
        console.error('API request failed:', error);
        throw new Error(`Failed to fetch data for key: ${key}`);
      }
    },
    
    async setToCache({ state }, { key, value }) {
      try {
        const cacheKey = encodeCacheKey(key);
        const serializedValue = escape(JSON.stringify(value));
        await CacheAPI.put(`/SET/${cacheKey}`, serializedValue);
      } catch (error) {
        console.error('Cache storage failed:', error);
        // Don't throw here as cache failure shouldn't break the app
      }
    }
  },
})

export default store
