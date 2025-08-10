<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const perPage = computed(() => store.state.perPage)
const page = computed(() => store.state.page)
const btns = ref([24, 48, 72, 100])

const searchFields = [
  {
    key: 'media',
    label: 'Search by media',
  },
  {
    key: 'quest',
    label: 'Search by quest',
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
  <v-toolbar border title="Dragon Age characters list" class="pa-4 ga-4 text-start" density="compact">
    <div class="text-teal-darken-2 text-overline font-weight-bold pr-4">
      Show
    </div>
    <v-btn
      v-for="(btnCount, index) in btns"
      :key="btnCount"
      @click="store.commit('setPerPage', btnCount)"
      :color="btnCount === perPage ? 'deep-orange-darken-4' : 'teal-darken-2'"
      :variant="btnCount === perPage ? 'outlined' : 'text'"
      :class="{'ma-0': index === btns.length - 1}"
    >
      {{ btnCount }}
    </v-btn>
    <template #extension>
      <v-row justify="end" class="ga-4" no-gutters>
        <v-col v-for="field in searchFields" :key="field.key" sm="5" md="4" lg="3">
          <v-text-field
            v-model="searchValues[field.key]"
            :label="field.label"
            clearable
            hide-details
            variant="outlined"
            single-line
            glow
            density="compact"
            :style="field.style"
            append-inner-icon="mdi-magnify"
            @click:append-inner="() => onSearch(field.key)"
            @click:clear="() => onClear(field.key)"
          />
        </v-col>
      </v-row>
    </template>
  </v-toolbar>
</template>
