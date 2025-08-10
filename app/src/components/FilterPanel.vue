<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const perPage = computed(() => store.state.perPage)
const page = computed(() => store.state.page)

const btns = ref([25, 50, 75, 100])

function getCharacters() {
  store.dispatch("getFromCacheCharacters", {
    key: `/?page=${page.value}&perPage=${perPage.value}`
  })
}

watch(perPage, () => {
  getCharacters()
})
</script>

<template>
  <div>
    <v-toolbar border title="Dragon Age characters list">
      <div class="text-teal-darken-2 text-overline font-weight-bold pr-3">
        Show
      </div>
      <v-btn
        v-for="btnCount in btns"
        :key="btnCount"
        @click="store.commit('setPerPage', btnCount)"
        :color="btnCount === perPage ? 'deep-orange-darken-4' : 'teal-darken-2'"
        :variant="btnCount === perPage ? 'outlined' : 'text'"
      >
        {{ btnCount }}
      </v-btn>
    </v-toolbar>
  </div>
</template>
