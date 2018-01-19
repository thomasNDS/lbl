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

      <h2>  {{trans[107]}} <!-- Origines des données --></h2>
      <p> {{trans[103]}} <!-- Les données de Lobbyland proviennent ... -->
       </p>
      <p>{{trans[104]}} <!--  Le site contient des lien ... --></p>

      <br/>
      <h2>{{trans[108]}} <!--  Réutilisation --></h2>
      <p class="text-center">
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" 
            src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a>
        <p/> {{trans[105]}} <!--  Le contenu de ce site est sous licence -->
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>. 
        {{trans[106]}}. <!-- Vous pouvez réutilisez l'intégralité -->


        
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
      trans: this.storage.trans || []
    }
  },
  created() {
    bus.$on('updateLang', section => {
      this.trans = this.storage.trans
    });
  },
  head: {
    meta: [
      { name: 'application-name', content: 'Name of my application' },
      { name: 'description', content: 'A description of the page', id: 'desc' }, // id to replace intead of create element
      // ...
      // Twitter
      { name: 'twitter:title', content: 'Content Title' },
      // with shorthand
      { n: 'twitter:description', c: 'Content description less than 200 characters' },
      // ...
      // Google+ / Schema.org
      { itemprop: 'name', content: 'Content Title' },
      { itemprop: 'description', content: 'Content Title' },
      // ...
      // Facebook / Open Graph
      { property: 'fb:app_id', content: '123456789' },
      { property: 'og:title', content: 'Content Title' },
      // with shorthand
      { p: 'og:image', c: 'https://example.com/image.jpg' },
      // ...
    ]
  }
}
</script>

<style>

</style>
