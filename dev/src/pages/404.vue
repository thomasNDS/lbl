<template>
  <div>

    <div class="lbl-page-header" style="">
        <div class="container text-center" style="padding:1em;">
          <h1 class="display-1">404</h1>
        </div><!-- End container -->
    </div><!-- End jumbotron -->

    <div class="container text-center">

<h1>Oops ... </h1>
<br/>
    <img :src="storage.ctxDist + '/static/broken.png'" style="width: 100px;"/>
    <br/><br/>
    <h3>{{gtrans[119]}}. <!-- This page doesn't exist anymore --> </h3>

    <br/>
    <b-button :href="'#/?lang=' + this.storage.lang"> {{gtrans[120]}} </b-button>
     
    </div>

  </div>

</template>

<script>
import bus from '../components/EventBus.js'

export default {
  name: 'page-error-not-found',
  props: ['storage'],

  data() {
    return {
      gtrans: this.storage.trans && this.storage.trans.g || []
    }
  },
  created() {
    bus.$on('updateLang', section => {
      this.gtrans = this.storage.trans.g
    });
  },

}
</script>

<style>

</style>
