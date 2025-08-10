<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { faGavel, faSeedling, faCrown, faQuestion, faShieldHalved } from '@fortawesome/free-solid-svg-icons'

const store = useStore()

const props = defineProps({
  characterId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['closeModal'])

const characterDetails = ref({})
const race = ref({})

// Move races object outside component to avoid recreation on each render
const RACES = {
  dwarf: {
    icon: faGavel,
    desc: 'Strong, stocky, and shorter than any other humanoid race, the dwarves are skilled builders and boast a long tradition of courage and martial skill that has served them well in their millennia-long battle against the darkspawn.'
  },
  human: {
    icon: faCrown,
    desc: 'Humans are the most numerous, yet also the most contentious of all the races of Thedas. The majority of humanity in Thedas descended from numerous human tribes.'
  },
  elf: {
    icon: faSeedling,
    desc: 'A humanoid race, elves have a slender, lithe build, large eyes, and pointed ears. Long ago, the elves were the dominant race on Thedas, and their advanced civilization was based on nature, the Fade and magic.'
  },
  qunari: {
    icon: faShieldHalved,
    desc: 'The Qunari (literally, "People of the Qun") is the umbrella term most commonly used to describe the white-haired, metallic-skinned race of large humanoids and their society that governs the islands of Par Vollen and Seheron, as well as the settlement of Kont-aar in northern Rivain, and Qundalon in the Anderfels.'
  },
  other: {
    icon: faQuestion,
  }
}

// Computed properties for better performance
const photoUrl = computed(() => {
  if (!characterDetails.value?.photo) return ''
  const revisionIndex = characterDetails.value.photo.indexOf('/revision/')
  return revisionIndex > -1 
    ? characterDetails.value.photo.substring(0, revisionIndex)
    : characterDetails.value.photo
})

const hasRace = computed(() => !!characterDetails.value?.race)
const hasGender = computed(() => !!characterDetails.value?.gender)
const hasClass = computed(() => !!characterDetails.value?.class)
const hasLocation = computed(() => !!characterDetails.value?.location)

// Methods
const closeModal = () => emit('closeModal')

// Lifecycle
onMounted(async () => {
  try {
    characterDetails.value = await store.dispatch("getFromCacheOneCharacterDetails", {
      key: `/${props.characterId}`
    })
    
    if (characterDetails.value?.race) {
      race.value = RACES[characterDetails.value.race.toLowerCase()] || { ...RACES.other, desc: `Non-standard race: ${characterDetails.value.race}` }
    }
  } catch (error) {
    console.error('Failed to fetch character details:', error)
  }
})
</script>

<template>
  <v-card 
    v-if="characterDetails" 
    variant="flat" 
    color="teal" 
    max-width="200" 
    class="pa-1 pt-1 text-caption"
  >
    <v-row justify="end" class="pb-1" no-gutters>
      <v-btn 
        @click="closeModal" 
        icon="mdi-close-outline" 
        density="compact" 
        size="small" 
        variant="text"
      />
    </v-row>
    
    <v-img
      v-if="characterDetails.photo"
      height="200"
      cover
      position="50% top"
      :src="photoUrl"
      :alt="`${characterDetails.name || 'Character'} photo`"
    />
    
    <div class="pa-2">
      <!-- Race -->
      <v-row v-if="hasRace" no-gutters>
        <v-col cols="auto" class="font-weight-bold">Race: </v-col>
        <v-col cols="2">
          <v-tooltip content-class="pa-0">
            <template #activator="{ props: tooltipProps }">
              <v-hover>
                <template #default="{ isHovering, props }">
                  <font-awesome-icon 
                    :class="{ inverted: isHovering }" 
                    :icon="race.icon" 
                    size="lg" 
                    v-bind="props, tooltipProps"
                    :alt="`${characterDetails.race} race icon`"
                  />
                </template>
              </v-hover>
            </template>
            <div class="py-2 px-3 bg-teal-lighten-4 text-cyan-darken-4" style="max-width: 200px;">
              {{ race.desc }}
            </div>
          </v-tooltip>
        </v-col>
      </v-row>
      
      <!-- Gender -->
      <div v-if="hasGender" class="font-weight-bold">
        Gender: <span class="font-weight-light">{{ characterDetails.gender }}</span>
      </div>
      
      <!-- Class -->
      <div v-if="hasClass" class="font-weight-bold">
        Class: <span class="font-weight-light">{{ characterDetails.class }}</span>
      </div>
      
      <!-- Location -->
      <div v-if="hasLocation" class="font-weight-bold">
        Location: <span class="font-weight-light">{{ characterDetails.location }}</span>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
:deep(.v-img.inverted) {
  filter: invert(100%);
}
</style>
