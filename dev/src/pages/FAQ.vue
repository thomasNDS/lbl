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
      lang: this.storage.trans || []
    }
  },
  created() {
     bus.$on('updateLang', section => {
        this.lang = this.storage.trans
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
      { n: 'twitter:description', c: 'Content description less than 200 characters'},
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
