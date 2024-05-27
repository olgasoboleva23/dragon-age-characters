<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore();

let perPage = computed(() => store.state.perPage)
let page = computed(() => store.state.page)

function getCharacters() {
  store.dispatch("getFromCacheCharacters", {key: `/?page=${page.value}&perPage=${perPage.value}`});
}

watch(perPage, (newVal, oldVal) => {
  getCharacters();
});

let btns = ref([])
btns = [25,50, 75, 100]
</script>
<template>
  <div>
    <v-toolbar border title="Dragon Age characters list">
      <div class="text-teal-darken-2 text-overline font-weight-bold pr-3">Show</div>
      <v-btn
        v-for="btn_count in btns"
        @click="store.commit('setPerPage',btn_count)"
        :color="btn_count == perPage? 'deep-orange-darken-4' : 'teal-darken-2'"
        :variant="btn_count == perPage? 'outlined' : 'text'"
      >
        {{btn_count}}
      </v-btn>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: 'FilterPanel'
}
</script>
