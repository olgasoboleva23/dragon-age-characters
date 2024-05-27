<script setup>
import { ref } from 'vue'
import FullInfo from '../components/FullInfo.vue'

const props = defineProps({
  character: Object
})

const modal = ref(false);
</script>
<template>
  <v-card class="pa-3 ma-1 bg-blue-grey-lighten-4" variant="tonal">
    <v-img
      v-if="character.photo"
      height="200"
      cover
      position="50% top"
      :src="character.photo.substr(0, character.photo.indexOf('/revision/'))"
    />
      <v-row justify=center class="text-deep-orange-darken-4 text-overline" no-gutters>
        {{character.name}}
      </v-row>
      <v-row justify=center no-gutters>
        <v-btn @click="modal = true" variant="outlined" size="x-small" block rounded="xl" color="teal-darken-2">more</v-btn>
      </v-row>
  </v-card>
  <!-- big card -->
  <v-dialog origin="center center" v-model="modal" width="300" scrim="teal-lighten-4">
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
