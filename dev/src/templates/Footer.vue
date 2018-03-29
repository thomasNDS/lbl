<template>
  <div id="lbl-footer" class="footer">

    <div class="container text-center">
      <a v-bind:href="'#/Disclaimer?lang=' + storage.lang" class="footer-link">
        <i class="fa fa-bullhorn icon-start" aria-hidden="true"></i>
        <span class="text-muted">
         Disclaimer
        </span>
      </a>
      <a v-bind:href="'#/Legal?lang=' + storage.lang" class="footer-link">
        <i class="fa fa-gavel icon-start" aria-hidden="true"></i>
        <span class="text-muted">
          {{ctrans.legalStatus}}
        </span>
      </a>
      <a v-bind:href="'#/contact?lang=' + storage.lang" class="footer-link">
        <i class="far fa-envelope icon-start" aria-hidden="true"></i>
        <span class="text-muted">
          Contact
        </span>
      </a>
      
      <div>
        <a href="https://twitter.com/share?url=https%3A//lobbyland.eu&related=Lobbyland%2CEU
                 &hashtags=lobbyland%2CEU
                 &text=Lobbyland, the EU lobby registry." class="footer-social-link">
          <i class="fab fa-twitter" aria-hidden="true" target="_blank"></i>
        </a>

        <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//lobbyland.eu" class="footer-social-link">
          <i class="fab fa-facebook" aria-hidden="true" target="_blank"></i>
        </a>

        <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//lobbyland.eu&title=lobbyland&summary=Lobbyland, the EU lobby registry.&source=" class="footer-social-link">
          <i class="fab fa-linkedin" aria-hidden="true" target="_blank"></i>
        </a>
      </div>

    </div>

    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" crossorigin="anonymous"> 
  </div>
</template>

<script>
import bus from '../components/EventBus.js'

export default {
  name: 'lbl-footer',
  props: ['storage'],
  data() {
    return {
      ctrans: {}
    }
  },
  created() {
     bus.$on('updateLang', section => {
        this.ctrans = this.storage.trans.common
      });
  },
  methods: {
        
    }
}
</script>

<style>

</style>
