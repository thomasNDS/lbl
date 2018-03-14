<template>

  <div id="lbl-map-wiki"class="text-center">
      <img id="lbl-map-img" :src="mapSrc" v-if="mapSrc !== 'loading'" class="lbl-flag"/>
      <span v-else-if="error"><span class="fa fa-times"></span></span>
      <span v-else class="fa fa-spinner fa-spin fa-2x fa-fw"></span>
   
  </div>

</template>

<script>
import md5 from "js-md5";

export default {
  name: "wiki-map",
  props: ["countryId"], // FR wiki ID

  data() {
    return {
      mapSrc: "loading",
      error : false
    };
  },
    watch: {
    'countryId': function (value) {
      this.loadWikiMap(value)
    }
  },
  mounted() {
    this.loadWikiMap(this.countryId)
  },
  methods: {
    /** */
    loadWikiMap: function(countryId) {
      
          if (countryId) {
            var url = "https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages&pageids=" + countryId
            this.$http.jsonp(url).then(
              response => {this.manageResponse(response)},
              response => {
                console.warn("error loading page");
                this.error = true
              }
            );
          }

    }, // end loadWikiMap

    /** */
    manageResponse: function(response) {
      try {
        var path = response.body.query.pages[Object.keys(response.body.query.pages)[0]].pageimage
        if (path) {
          path = path.replace(' ', '_')
          var hash = md5(path).substring(0,2)

          var src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + hash.substring(0,1) + '/' + hash + '/' + path + '/571px-' + path + '.png'
          this.mapSrc = src
        }
      } catch (e) {
         this.error = true
         console.warn(e)
       }
    }

  } // end methods
};
</script>

<style lang="scss" scoped>

 #lbl-map-img {
   width: 420px;
   float: right;
 }
</style>
