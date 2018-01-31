<template>
  <div id="wrap">

    <div class="container">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a v-bind:href="'#/?lang=' + storage.lang">
            {{trans[53]}} <!--  Accueil -->
          </a>
        </li>
        <li class="breadcrumb-item">
          <a :href="'#/activities?lang=' + storage.lang">
             {{trans[45]}} <!-- Activities -->
          </a>
        </li>
        <li class="breadcrumb-item active">
          {{trans[122 + parseInt(interet.idLang)]}}
        </li>
      </ol>

      <h1>
            <img id="titleImg"
              :src="storage.ctxDist + '/static/' + compactId +'.svg'" 
              class="icon-global"/>
            {{trans[122 + parseInt(interet.idLang)]}}
      </h1>
      <hr class="my-4"/>
    </div>
    <div id="block-info">
      <div class="container">
              
        <h3 id="Presentation" class="sub-t1">
              {{trans[11]}} <!-- Presentation -->
        </h3>
        <div class="row">

        </div> <!-- End row -->
      </div><!-- End container -->
      
      <div class="part-split">
        <div class="container">
        
      <!-- ****************** -->
      <!--    Informations    -->
      <!-- ****************** -->
          <h3 id="Informations" class="sub-t1">{{trans[23]}} <!-- Informations --></h3>
          
            
          <p class="lbl-badge"><span class="eme-parse">{{interet.rankNbLobby }}</span>/ 27</p>  
         
        </div><!-- End container -->
      </div>
      
    </div> <!-- End block-header -->
  </div>

</template>

<script>
import bus from "../components/EventBus.js";

export default {
  name: "interet",
  props: ["storage"],
  components: {
  },
  data() {
    return {
      trans: this.storage.trans || [],
      interet: [],
      showTopBudget : true
    };
  },
  methods: {
    /** */
    loadPage: function(idPage) {

      this.$http.get(this.storage.cacheUrl + "interet/" + idPage + '.json').then(
        response => {
          console.log("response.body")
          console.log(response.body)
          this.interet = response.body;
        },
        response => {
          console.error("error loading page");
        }
      );
    },

  },
  watch: {
    '$route.params.id': function (id) {
      this.loadPage(this.$route.params.id)
    }
  },
  computed: {
       compactId: function()  {
         if (this.interet.id) {
         return this.interet.id.slice(0,4) +  this.interet.id.slice(-2)
         } else {
           return "loading"
         }
         },
     
       topBudget: function() { 
         if (!this.interet.topLobbyCash) return []
         var cpt = 0
         return this.interet.topLobbyCash.map(function(c){
             var r = {}
             r.id = c[0]
             r.name = c[1]
             r.value = c[2]
             r.idx = cpt++
             return r
         })
        },
        topPeople: function() { 
          if (!this.interet.topLobbyPeople) return []
          var cpt = 0
          return this.interet.topLobbyPeople.map(function(c){
             var r = {}
             r.id = c[0]
             r.name = c[1]
             r.value = c[2]
             r.idx = cpt++
             return r
          })
         },

    getDescription: function() {
         if (this.interet && this.interet.id) {
            return 'All about ' + this.interet.id + ' activities of european lobbys'
          } else {
            return 'Lobbyland'
          }
      },
       
  },

  /** Init */
  created() {
    bus.$on("updateLang", section => {
      this.trans = this.storage.trans;
    });
    this.loadPage(this.$route.params.id)
  },
  head: {
    meta: [
      { name: "Lobbyland", content: "Lobbyland" },
      { name: "description", content: this.getDescription, id: "desc" },
      // Twitter
      { name: "twitter:title", content: this.getDescription },
      // with shorthand
      {
        n: "twitter:description",
        c: this.getDescription
      },
      // Google+ / Schema.org
      { itemprop: "name", content: "Lobbyland" },
      { itemprop: "description", content: this.getDescription },

      // Facebook / Open Graph
      { property: "og:title", content: this.getDescription }
    ]
  }
};
</script>

<style lang="scss" scoped>

.icon-global {
  width: 60px;
  margin-right:20px;
}

</style>
