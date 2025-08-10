<script setup>
import CharacterCard from './CharacterCard.vue'
import { computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Computed properties
const characters = computed(() => store.state.characters)
const page = computed({
  get: () => store.state.page,
  set: (newVal) => store.commit('setPage', newVal)
})
const perPage = computed(() => store.state.perPage)

// Constants
const TOTAL_CHARACTERS = 792
const TOTAL_PAGES = computed(() => Math.ceil(TOTAL_CHARACTERS / perPage.value))

// Methods
const getCharacters = () => {
  store.dispatch("getFromCacheCharacters", {
    key: `/?page=${page.value}&perPage=${perPage.value}`
  })
}

// Lifecycle
onMounted(() => {
  getCharacters()
})

// Watchers
watch([page, perPage], () => {
  // Clamp page to max if perPage changes and page is out of range
  if (page.value > TOTAL_PAGES.value) {
    store.commit('setPage', TOTAL_PAGES.value)
  } else {
    getCharacters()
  }
})
</script>

<template>
  <div>
    <v-row no-gutters>
      <v-col 
        cols="3" 
        v-for="character in characters" 
        :key="character.id"
      >
        <CharacterCard :character="character" />
      </v-col>
    </v-row>
    
    <v-row justify="center" no-gutters>
      <v-pagination
        v-model="page"
        :length="TOTAL_PAGES"
        :total-visible="7"
        color="teal-darken-2"
      />
    </v-row>
  </div>
</template>
