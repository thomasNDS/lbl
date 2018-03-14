<template>
    <div  class="text-center lbl-interets">
        <span v-for="int in interets" :key="int.id" v-if="interets.length > 0" class="lbl-interet">

            <a :href="'#/activity/' + int.id + '?lang=' + storage.lang"> 
            
                <img :id="'ic-' + compactIdFun(int)"
                     :src="storage.ctxDist + '/static/img/interets/' + compactIdFun(int) + '.svg'" 
                     class="icon-interest"/>

               <b-tooltip v-if="transLoaded" :target="'ic-' + compactIdFun(int)">{{trans[121 + parseInt(int.idLang)]}}</b-tooltip>

            </a>

        </span>
    </div>

</template>

<script>
import bus from "./EventBus.js";

export default {
  name: "all-interets-list",
  props: ["storage"],

  data() {
    return {
      txt: "loading",
      error : false,
      interets : [],
      trans: []
    };
  },
  mounted() {
    this.loadInterets()

    if (this.storage.trans != null) {
        this.trans = this.storage.trans.g
    }
    bus.$on("updateLang", section => {
      this.trans = this.storage.trans.g
    });
  },
  methods: {
       /** */
    loadInterets: function() {

      if (this.storage.interets) {
        this.interets = this.storage.interets
      } else {

        this.$http.get(this.storage.cacheUrl + "interets.json").then(
          response => {
            // console.log("response.body")
            // console.log(response.body)
            this.interets = response.body.interets
            this.storage.interets = this.interets 
          },
          response => {
            console.error("error loading page");
          }
        ); // end http

      } // end else
    },
    
    compactIdFun: function(int)  {

         if (int.id) {
            return int.id.slice(0,4) +  int.id.slice(-2)
         } else {
           return "loading"
         }
       },

  }, // end methods
   computed: {
    transLoaded: function() {
      return this.trans.length > 0;
    }
   }
};
</script>

<style lang="scss" scoped>

.lbl-interet {
    margin: 0.3em;
}
.lbl-interets {
   line-height: 4em;
}

</style>
