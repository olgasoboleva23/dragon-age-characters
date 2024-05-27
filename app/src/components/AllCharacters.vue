<script setup>
import CharacterCard from '../components/CharacterCard.vue'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore();
const characters = computed(() => store.state.characters)
const page = computed({
  get() {
    return store.state.page;
  },
  set(newVal) {
    store.commit('setPage', newVal)
  }
})

const total = 792;
const perPage = ref(20);

function getCharacters() {
  store.dispatch("getFromCacheCharacters", {key: `/?page=${page.value}&perPage=${perPage.value}`});
  console.log('characters',characters.value)
}

getCharacters();

watch(page, (newVal, oldVal) => {
  getCharacters();
});
</script>

<template>
  <v-row no-gutters>
    <v-col cols="3" v-for="character in characters">
    <CharacterCard
        :character="character"
        :key="character.id"
    />
    </v-col>
  </v-row>
  <v-row justify="center" no-gutters>
    <v-pagination
      v-model="page"
      :length="Math.floor(total/perPage)"
      :total-visible="7"
      color="teal-darken-2"
    />
  </v-row>
</template>
<script>
export default {
  name: 'AllCharacters'
}
</script>
