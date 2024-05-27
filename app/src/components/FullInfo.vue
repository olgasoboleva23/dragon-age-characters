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

const races = {
  dwarf: {
    icon: 'https://www.svgrepo.com/show/323862/dwarf-helmet.svg',
    desc: 'Strong, stocky, and shorter than any other humanoid race, the dwarves are skilled builders and boast a long tradition of courage and martial skill that has served them well in their millennia-long battle against the darkspawn.'
  },
  human: {
    icon: 'https://static.wikia.nocookie.net/dragonage/images/4/46/%D0%9E%D1%80%D0%B4%D0%B5%D0%BD_%D1%85%D1%80%D0%B0%D0%BC%D0%BE%D0%B2%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2_%28%D0%B8%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0%29.png/revision/latest?cb=20160106092550&path-prefix=ru',
    desc: 'Humans are the most numerous, yet also the most contentious of all the races of Thedas. The majority of humanity in Thedas descended from numerous human tribes.'
  },
  elf: {
    icon: 'https://i.pinimg.com/originals/67/7c/eb/677cebb4cc6c41f268a82243e5b8a904.png',
    desc: 'A humanoid race, elves have a slender, lithe build, large eyes, and pointed ears. Long ago, the elves were the dominant race on Thedas, and their advanced civilization was based on nature, the Fade and magic.'
  },
  qunari: {
    icon: 'https://static.wikia.nocookie.net/dragonage/images/5/50/Qunari_House_of_Tides_heraldry.svg/revision/latest/scale-to-width-down/230?cb=20110810194001',
    desc: 'The Qunari (literally, "People of the Qun") is the umbrella term most commonly used to describe the white-haired, metallic-skinned race of large humanoids and their society that governs the islands of Par Vollen and Seheron, as well as the settlement of Kont-aar in northern Rivain, and Qundalon in the Anderfels.'
  }
}
let race = ref({});
if (characterDetails?.race) {
  race = races[characterDetails?.race.toLowerCase()]
}

</script>
<template>
  <v-card v-if="characterDetails" variant="flat" color="teal" max-width="200" class="pa-1 pt-1 text-caption">
    <v-row justify="end" class="pb-1" no-gutters>
      <v-btn @click="$emit('closeModal')" icon="mdi-close-outline" density="compact" size="small" variant="text"></v-btn>
    </v-row>
    <v-img
      v-if="characterDetails?.photo"
      height="200"
      cover
      position="50% top"
      :src="characterDetails.photo.substr(0, characterDetails.photo.indexOf('/revision/'))"
    />
    <!-- Race -->
    <div class="pa-2">
      <v-row v-if="characterDetails.race" no-gutters>
        <v-col cols=auto class="font-weight-bold">Race: </v-col>
        <v-col cols=2>
          <v-tooltip>
            <template #activator="{ props: tooltipProps }">
              <v-hover>
                <template #default="{ isHovering, props }">
                  <v-img :class="{invertedIcon: isHovering}" height="25" :src="race.icon" v-bind="props,tooltipProps"></v-img>
                </template>
              </v-hover>
            </template>
            <div class="py-2 px-3 bg-teal-lighten-4 text-cyan-darken-4" style="max-width: 200px;">{{race.desc}}</div>
          </v-tooltip>
        </v-col>
      </v-row>
      <div v-if="characterDetails.gender" class="font-weight-bold">Gender: <span class="font-weight-light">{{characterDetails.gender}}</span></div>
      <div v-if="characterDetails.class" class="font-weight-bold">Class: <span class="font-weight-light">{{characterDetails.class}}</span></div>
      <div v-if="characterDetails.location" class="font-weight-bold">Location: <span class="font-weight-light">{{characterDetails.location}}</span></div>
    </div>
  </v-card>
</template>
<style>
.invertedIcon {
  filter: invert(100%);
}
.v-tooltip > .v-overlay__content {
  padding: 0 !important;
}
</style>
