<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore();

const props = defineProps({
  character_id: String
})

defineEmits(['closeModal']);

let characterDetails = ref({});
characterDetails = await store.dispatch("getFromCacheOneCharacterDetails", {key: `/${props.character_id}`});
console.log({characterDetails})

console.log('created',props.character_id)

const races = {
  dwarf: {
    icon: 'https://www.svgrepo.com/show/323862/dwarf-helmet.svg',
    desc: 'Strong, stocky, and shorter than any other humanoid race, the dwarves are skilled builders and boast a long tradition of courage and martial skill that has served them well in their millennia-long battle against the darkspawn.'
  },
  human: {
    icon: '',
    desc: ''
  },
  elf: {
    icon: '',
    desc: ''
  },
  qunari: {
    icon: '',
    desc: ''
  }
}
let race = ref({});
if (characterDetails?.race) {
  race = races[characterDetails?.race.toLowerCase()]
}

</script>
<template>
  <v-card v-if="characterDetails" variant="flat" color="teal" max-width="200">
    <v-row justify="end" no-gutters>
      <v-btn @click="$emit('closeModal')">close</v-btn>
    </v-row>
    <v-img
      v-if="characterDetails?.photo"
      height="200"
      cover
      position="50% top"
      :src="characterDetails.photo.substr(0, characterDetails.photo.indexOf('/revision/'))"
    />
    <div v-if="characterDetails.gender">Gender: {{characterDetails.gender}}</div>
    <div v-if="characterDetails.class">Class: {{characterDetails.class}}</div>
    <div v-if="characterDetails.location">Location: {{characterDetails.location}}</div>
    <v-row v-if="characterDetails.race" no-gutters>
      <v-col cols=auto>Race: </v-col>
      <v-col cols=2>
        <v-tooltip>
          <template #activator="{ props: tooltipProps }">
            <v-hover>
              <template #default="{ isHovering, props }">
                <v-img :class="{invertedIcon: isHovering}" height="25" :src="race.icon" v-bind="props,tooltipProps"></v-img>
              </template>
            </v-hover>
          </template>
          <div style="max-width: 150px;">{{race.desc}}</div>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-card>
</template>
<style scoped>
.invertedIcon {
  filter: invert(100%);
}
</style>
