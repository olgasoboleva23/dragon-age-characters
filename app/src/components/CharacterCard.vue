<template>
  <div>
    <v-card>
      <v-img
        v-if="character.photo"
        height="200"
        cover
        position="50% top"
        :src="character.photo.substr(0, character.photo.indexOf('/revision/'))"
      />
      {{character.name}}
      <img v-if="raceIcon" :src="raceIcon"></img>
      {{character}}
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'CharacterCard',
  props: ['character'],
  computed: {
    raceIcon() {
      switch(this.character?.race) {
        case 'dwarf':
          return 'https://www.svgrepo.com/show/323862/dwarf-helmet.svg';
          break;
        case 'human':
          return '';
        case 'elf':
          return '';
        case 'qunari':
          return ''
        default:
          return null
      }
    }
  },
}
</script>
