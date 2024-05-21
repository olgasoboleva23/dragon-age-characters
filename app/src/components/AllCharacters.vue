<script setup>
import CharacterCard from '../components/CharacterCard.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore();
const characters = computed(() => store.state.characters)

store.dispatch("getFromCache", '/');
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
</template>
<script>
export default {
  name: 'AllCharacters',
}
</script>
