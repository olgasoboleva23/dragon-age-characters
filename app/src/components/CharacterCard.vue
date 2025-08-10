<script setup>
import { ref } from 'vue'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import FullInfo from './FullInfo.vue'

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const modal = ref(false)
</script>

<template>
  <v-card class="pa-3 ma-1 bg-blue-grey-lighten-4" variant="tonal">
    <v-img
      v-if="character.photo"
      :aspect-ratio="4/3"
      cover
      position="50% top"
      :src="character.photo.split('/revision/')[0]"
    />
    <v-row justify="center" class="text-deep-orange-darken-4 text-overline" no-gutters>
      {{ character.name }}
    </v-row>
    <v-row justify="center" no-gutters>
      <v-btn 
        @click="modal = true" 
        variant="outlined" 
        size="x-small" 
        block 
        rounded="xl" 
        color="teal-darken-2"
      >
        more
        <font-awesome-icon 
          :icon="faAnglesRight" 
        />
      </v-btn>
    </v-row>
  </v-card>
  
  <v-dialog 
    v-model="modal" 
    width="300" 
    scrim="teal-lighten-4"
    origin="center center"
  >
    <Suspense>
      <FullInfo 
        @close-modal="modal = false" 
        :character-id="character._id" 
      />
    </Suspense>
  </v-dialog>
</template>
