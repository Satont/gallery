<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <router-link to="/" class="navbar-brand js-scroll-trigger text-white-50">Gallery</router-link>

        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">Menu</button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item"><router-link to="/" class="nav-link js-scroll-trigger">Home</router-link></li>
            <li class="nav-item"><router-link to="/pics" class="nav-link js-scroll-trigger">Pics</router-link></li>
          </ul>
          </div>
        </div>
      </nav>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
