<template>

  <span id="lbl-map-flag"class="text-center">
      <img id="flag-wiki" :src="mapSrc" v-if="mapSrc !== 'loading'" class="lbl-flag" />
      <span v-else-if="error"><span class="fa fa-times"></span></span>
      <span v-else class="fa fa-spinner fa-spin fa-fw"></span>
  </span>

</template>

<script>

export default {
  name: "wiki-flag",
  props: ["countryId"], // EN wiki ID

  data() {
    return {
      mapSrc: "loading",
      error : false
    };
  },
    watch: {
    'countryId': function (value) {
      this.loadWikiFlag(value)
    }
  },
  mounted() {
    this.loadWikiFlag(this.countryId)
  },
  methods: {
    /** */
    loadWikiFlag: function(countryId) {
      
          if (countryId) {
            var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages&pageids=" + countryId
            this.$http.jsonp(url).then(
              response => {this.manageResponse(response)},
              response => {
                console.warn("error loading page");
                this.error = true
              }
            );
          }

    }, // end loadWikiFlag

    /** */
    manageResponse: function(response) {
      try {
        if (response.body.query.pages[Object.keys(response.body.query.pages)[0]].thumbnail) {
            this.mapSrc = response.body.query.pages[Object.keys(response.body.query.pages)[0]].thumbnail.source
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

 #flag-wiki {
   width: 50px;
   height: 35px;
 }
</style>
