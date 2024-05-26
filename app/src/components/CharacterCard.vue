<script setup>
import { ref } from 'vue'
import FullInfo from '../components/FullInfo.vue'

const props = defineProps({
  character: Object
})

const modal = ref(false);
</script>
<template>
  <v-card>
    <v-img
      v-if="character.photo"
      height="200"
      cover
      position="50% top"
      :src="character.photo.substr(0, character.photo.indexOf('/revision/'))"
    />
    {{character.name}}
    {{character}}
    <v-btn @click="modal = true">more</v-btn>
  </v-card>
  <!-- big card -->
  <v-dialog origin="center center" v-model="modal" width="300">
    <!-- <keep-alive> -->
    <Suspense>
      <FullInfo @close-modal="modal = false" :character_id="character._id" />
    </Suspense>
    <!-- </keep-alive> -->
  </v-dialog>
</template>
<script>
export default {
  name: 'CharacterCard',
}
</script>
