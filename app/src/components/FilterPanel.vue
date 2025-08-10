<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const perPage = computed(() => store.state.perPage)
const page = computed(() => store.state.page)
const btns = ref([25, 50, 75, 100])

const searchFields = [
  {
    key: 'media',
    label: 'Search by media (comic, game, etc)',
    style: 'max-width: 320px;'
  },
  {
    key: 'quest',
    label: 'Search by quest',
    style: 'max-width: 320px; margin-left: 16px;'
  }
]

const searchValues = ref({ media: '', quest: '' })

function getCharacters() {
  let key = `/?page=${page.value}&perPage=${perPage.value}`
  if (searchValues.value.media) {
    key += `&appearances=${encodeURIComponent(searchValues.value.media)}`
  }
  if (searchValues.value.quest) {
    key += `&quests=${encodeURIComponent(searchValues.value.quest)}`
  }
  store.dispatch("getFromCacheCharacters", { key })
}

watch(perPage, () => {
  getCharacters()
})

function onSearch() {
  store.commit('setPage', 1)
  getCharacters()
}

function onClear(field) {
  searchValues.value[field] = ''
  store.commit('setPage', 1)
  getCharacters()
}
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
      <v-spacer />
      <template v-for="field in searchFields" :key="field.key">
        <v-text-field
          v-model="searchValues[field.key]"
          :label="field.label"
          clearable
          hide-details
          solo
          :style="field.style"
          append-inner-icon="mdi-magnify"
          @click:append-inner="() => onSearch(field.key)"
          @click:clear="() => onClear(field.key)"
        />
      </template>
    </v-toolbar>
  </div>
</template>
