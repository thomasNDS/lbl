<template>
  <div>

    <div class="container text-center">
      We are working on it !
      </div>

    </div>

  </div>
</template>

<script>
import bus from '../components/EventBus.js'

export default {
  name: 'faq',
  props: ['storage'],

  data() {
    return {
      msg: 'topPage',
      lang: this.storage.trans && this.storage.trans.g || [],
    }
  },
  created() {
     bus.$on('updateLang', section => {
        this.lang = this.storage.trans.g
      });
  },
  metaInfo () {
    return {meta: [
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

<style>

</style>
