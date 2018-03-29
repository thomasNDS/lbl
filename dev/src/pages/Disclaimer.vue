<template>
  <div>

    <div class="lbl-page-header" style="">
      <div class="container text-center" style="padding:1em;">
        <h1 class="display-3">Disclaimer</h1>
      </div>
      <!-- End container -->
    </div>
    <!-- End jumbotron -->

    <div class="container">

      <h2>  {{gtrans[107]}} <!-- Origines des données --></h2>
      <p> {{gtrans[103]}} <!-- Les données de Lobbyland proviennent ... -->
       </p>
      <p>{{gtrans[104]}} <!--  Le site contient des lien ... --></p>

      <br/>
      <h2>{{gtrans[108]}} <!--  Réutilisation --></h2>
      <p class="text-center">
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" 
            src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a>
        <p/> {{gtrans[105]}} <!--  Le contenu de ce site est sous licence -->
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>. 
        {{gtrans[106]}}. <!-- Vous pouvez réutilisez l'intégralité -->
        
    </div>

  </div>
</template>

<script>
import bus from '../components/EventBus.js'

export default {
  name: 'disclaimer',
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
  computed: {
       getDescription: function() { return "Lobbyland - Disclaimer of the website : " + this.gtrans[103]},
  },
  metaInfo () {
    return {
      title: this.getDescription,
      meta: [
              { name: "Lobbyland", content: "Lobbyland" },
              { name: "description", content: this.getDescription, id: "desc" },
              // Twitter
              { name: "twitter:title", content: this.getDescription},
              // with shorthand
              {n: "twitter:description", c: this.getDescription},

              { name: "generator", content:"program"},
              
              // Google+ / Schema.org
              { itemprop: "name", content: "Lobbyland" },
              { itemprop: "description", content: this.getDescription},

              // Facebook / Open Graph
              { property: "og:title", content: this.getDescription}
            ]}
  },
}
</script>

<style lang="scss" scoped>

</style>
