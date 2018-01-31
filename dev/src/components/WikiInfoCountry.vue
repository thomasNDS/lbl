<template>

  <p class="text-justify">
      <span v-if="txt !== 'loading'"> {{txt}} </span>
      <span v-else-if="error"><span class="fa fa-times"></span></span>
      <span v-else class="fa fa-spinner fa-spin fa-fw"></span>
  </p>

</template>

<script>

export default {
  name: "wiki-info-country",
  props: ["countryId", "lang"], // wiki ID

  data() {
    return {
      txt: "loading",
      error : false
    };
  },
    watch: {
    'countryId': function (value) {
      this.loadWikiInfo(value)
    }
  },
  mounted() {
    this.loadWikiInfo(this.countryId)
  },
  methods: {
    /** */
    loadWikiInfo: function(countryId) {
      
          if (countryId) {
            var url = "https://" + this.lang 
                + ".wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&pageids=" + countryId

            this.$http.jsonp(url).then(
              response => {this.manageResponse(response)},
              response => {
                console.warn("error loading wiki descrp");
                this.error = true
              }
            );
          }

    }, // end loadWikiInfo

    /** */
    manageResponse: function(response) {
      try {
          var brut = response.body.query.pages[Object.keys(response.body.query.pages)[0]].extract

          this.txt = brut.replace(/ *\([^)]*\) */g, "").split('.')
                         .slice(0,4)
                         .join('.')
                         .replace(/[\)\(]/g, "") + '. [...]'
    
      } catch (e) {
         this.error = true
         console.warn(e)
       }
    }

  } // end methods
};
</script>

<style>
 #flag-wiki {
   width: 50px;
 }
</style>
