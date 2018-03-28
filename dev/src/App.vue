<template>
  <div id="app">
      <lbl-header v-bind:storage="storage"></lbl-header>

      <router-view id="root"></router-view>
      
      <lbl-footer v-bind:storage="storage"></lbl-footer>
  </div>
</template>

<script>

import Header from './templates/Header.vue'
import Footer from './templates/Footer.vue'

export default {
  name: 'app',
  props: ['storage', 'lang'],
  components: {
        "lbl-header": Header,
        "lbl-footer" : Footer
    },
  data () {
    return {
    }
  },
  
}
</script>

<style>

#root {
  padding-bottom:3em;
}

</style>
