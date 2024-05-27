<script setup>
import AllCharacters from './components/AllCharacters.vue'
import FilterPanel from './components/FilterPanel.vue'
</script>

<template>
  <div class="bg-white">
    <FilterPanel />
    <AllCharacters />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>
