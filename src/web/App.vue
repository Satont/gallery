<template>
  <div class="home">
    <router-view />
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
