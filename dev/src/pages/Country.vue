<template>
  <div id="wrap">

    <div class="container">

      <ol class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">
        <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
          <a v-bind:href="'#/?lang=' + storage.lang" itemscope itemtype="http://schema.org/Thing" itemprop="item">
            <span itemprop="name">{{ctrans.home}}</span>
          </a>
          <meta itemprop="position" content="1" />
        </li>
        <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
          <a :href="'#/countries?lang=' + storage.lang" itemscope itemtype="http://schema.org/Thing" itemprop="item">
             <span itemprop="name">{{gtrans[45]}} <!-- Countries --></span>
          </a>
          <meta itemprop="position" content="2" />
        </li>
        <li class="breadcrumb-item active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
          <span itemprop="name">{{country.id }}</span>
          <meta itemprop="position" content="3" />
        </li>
      </ol>

      <h1>
        {{country.id}}
      </h1>
      <hr class="my-4"/>
    </div>
    <div id="block-info">
      <div class="container">
        <h3 id="Presentation" class="sub-t1">{{gtrans[11]}} <!-- Presentation --></h3>
        <div class="row">
          <div class="col-12 col-lg-6">
            <p>
              <lbl-wikiflag :countryId="country.wikiIdEn" v-if="ctrans.currentLang"></lbl-wikiflag>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/50px-Flag_of_Europe.svg.png" style="border: solid 1px #b3b3b3;" v-if="country.isEU"/>
            </p>

            <lbl-wikiinfo :countryId="ctrans.currentLang=='en'?country.wikiIdEn:country.wikiIdFr" 
                            :lang="ctrans.currentLang" v-if="ctrans.currentLang"></lbl-wikiinfo>
                
            <!-- WIKIPEDIA -->
            <p class="text-right"><a :href="'https://' + ctrans.currentLang + '.wikipedia.org/w/index.php?curid=' + (ctrans.currentLang=='en' ?country.wikiIdEn:country.wikiIdFr)" target="_blank">
              {{gtrans[59]}} <!-- Show more --> Wikipedia</a> </p>

            <!-- Population -->        
            <p v-if="country.pop != ''"> 
              <i class="fa fa-building icon-start" aria-hidden="true"></i>
              <span class="info">{{gtrans[60]}} <!-- Population --> :</span> <span class="data currency-parse">{{country.pop }}</span> 
              {{gtrans[64]}} <!-- habitants -->

              <span v-if="country.popDateRef != ''">({{gtrans[62]}}<!-- in --> {{country.popDateRef}})</span>
            </p>
            
            <!-- GPD -->
            <p v-if="country.gpd != ''">
              <i class="fa fa-building icon-start" aria-hidden="true"></i>
              <span class="info">{{gtrans[61]}} <!-- GPD --> :</span> <span class="data currency-parse">{{country.gpd }}</span> 
              ({{gtrans[63]}}<!-- millions de dollards -->

              <span v-if="country.gpdDateRef != ''">({{gtrans[62]}}<!-- in --> {{country.gpdDateRef}})</span>
            </p>

          </div> <!-- End col -->
            
          <div class="col-12 col-lg-6">

              <!--      MAP           -->
              <!-- ****************** -->    
              <lbl-wikimap :countryId="country.wikiIdFr" v-if="ctrans.currentLang"></lbl-wikimap>
          </div> <!-- End col -->
        </div> <!-- End row -->
      </div><!-- End container -->
      
      <div class="part-split">
        <div class="container">
        
      <!-- ****************** -->
      <!--    Informations    -->
      <!-- ****************** -->
          <h3 id="Informations" class="sub-t1">{{gtrans[23]}} <!-- Informations --></h3>
          
          <p><span style="font-size:2em"> {{country.nbLobby}} </span> {{gtrans[65]}} <!-- lobbys in brux -->.
              
              <br/><span v-if="percentBruxel > 0.05">
                {{gtrans[67]}}<!-- Soit --> {{Math.round(percentBruxel * 10) / 10}} %
                {{gtrans[66]}}<!-- de l'ensemble des lobbys -->.
              </span>
          </p>
            
          <p class="lbl-badge"><span class="eme-parse">{{ country.rankNbLobby }}</span>/ 130</p>  
          <div class="lbl-progress">        
              <i :class="{'lbl-selected': (limitBruxel >= i*(100/18)-5)}" v-for="i in 18" :key="i" class="fa fa-building icon-stat" aria-hidden="true"></i>
          </div>
          <hr/>
             
          <p>{{gtrans[68]}} <!-- Ce qui représente --> <span style="font-size:2em"> <span>{{ country.cost | currency }}</span> € </span> 
          {{gtrans[69]}}<!-- de dépenses annuelles -->. 
          <br/>
          <span v-if="percentCash > 0.05">
            {{gtrans[67]}} <!-- Soit --> {{Math.round(percentCash * 10) / 10}} % 
            {{gtrans[70]}}<!-- des dépenses totales -->.
          </span>

          <p class="lbl-badge"><span class="eme-parse">{{country.rankCost}}</span> / 130</p>
          <div class="lbl-progress">
              <i :class="{'lbl-selected': (limitCash >= i*(100/18)-5)}" v-for="i in 18" :key="i" class="fas fa-euro-sign icon-stat" aria-hidden="true"></i>
          </div>

          <hr/>
          <p> <span style="font-size:2em"> {{country.nbLobbyist}} </span> 
            {{gtrans[71]}} <!-- personnes impliqués -->.
            <br/>
            <span v-if="percentPeople > 0.05">
                {{gtrans[67]}} <!-- Soit --> {{Math.round(percentPeople * 10) / 10}} % 
                {{gtrans[72]}}<!-- de l'ensemble des effectifs -->.
            </span>
          </p>
          <p class="lbl-badge"><span class="eme-parse">{{country.rankNbLobbyist}}</span> / 130 </p>
          <div class="lbl-progress">
            <i :class="{'lbl-selected': (limitPeople >= i*(100/18)-5)}" v-for="i in 18" :key="i" class="fa fa-male icon-stat" aria-hidden="true"></i>
          </div>
           <br/>
        </div><!-- End container -->
      </div>
      
      <div class="container">
      
      <!-- ****************** -->
      <!--    Cities          -->
      <!-- ****************** -->
        <h3 id="" class="sub-t1">{{gtrans[54]}} <!-- Head office cities --> </h3>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>{{gtrans[55]}} <!-- Cities --></th>
              <th>{{gtrans[56]}} <!-- Lobby count --></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="city in topCities" :key="city.idx">
              <th>{{city.idx}}</th>
              <td>{{city.id | majuscule}}</td>
              <td>{{city.value}}</td>
            </tr>
  
          </tbody>
        </table>

       <br/>
      </div><!-- End container -->
      
      <div class="part-split">
        <div class="container">
        
      <!-- ******************** -->
      <!-- Organizations status -->
      <!-- ******************** -->
      <b-button-group class="float-right lbl-combo-btn">
        <b-button v-on:click="showStatusGraph = true" :variant="!showStatusGraph && 'dark' || 'default'">
          <i class="fas fa-chart-pie" aria-hidden="true"/>
        </b-button>
        <b-button v-on:click="showStatusGraph = false" :variant="showStatusGraph && 'dark' || 'default'">
          <i class="fa fa-list-ol" aria-hidden="true"/>
        </b-button>
      </b-button-group>
        
      <h3 id="lobbys-status" class="sub-t1">{{gtrans[57]}} <!--  Lobby Status --></h3>
     
     <div class="text-center" id="donut-status" v-if="showStatusGraph">
       <lbl-pie-chart :datachart="orgaStatus" id="donut_single" class="donut-chart"></lbl-pie-chart>
     </div>

      <div id="table-status" v-else>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>{{gtrans[58]}} <!-- Status --></th>
              <th>{{gtrans[56]}} <!-- Lobby count --></th>
            </tr>
          </thead>
          <tbody>      
            
            <tr v-for="status in orgaStatus" :key="status.idx">
              <th>{{status.idx}}</th>
              <td>{{status.t}} </td>
              <td>{{status.value}}</td>
            </tr>      

          </tbody>
        </table>
    </div>
   
        </div> <!-- End container -->
      </div> <!-- End block-info -->
       
      <div class="container">
      
      <!-- ****************** -->
      <!--    TOP by budget   -->
      <!-- ****************** -->
        
      <b-button-group class="float-right lbl-combo-btn">
        <b-button v-on:click="showTopBudget = true" :variant="!showTopBudget && 'dark' || 'default'">
          <i class="fas fa-euro-sign" aria-hidden="true"/>
        </b-button>
        <b-button v-on:click="showTopBudget = false" :variant="showTopBudget && 'dark' || 'default'">
          <i class="fa fa-users" aria-hidden="true"/>
        </b-button>
      </b-button-group>

        <div id="table-top-budget" v-if="showTopBudget">
          <h3 id="" class="sub-t1">{{gtrans[73]}} <!-- Biggest lobbies --> </h3>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Lobby</th>
                <th>{{gtrans[74]}} <!-- Budget --></th>
              </tr>
            </thead>
            <tbody>
            
            <tr v-for="b in topBudget" :key="b.idx">
              <th>{{b.idx}}</th>
              <td><a class="dark-link" :href="'/#/orga/' + b.id + '?lang=' + storage.lang">{{b.name}}</a></td>
              <td><span class="currency-parse">{{Math.round(b.value) | currency}}</span> €</td>
            </tr>
              
            </tbody>
          </table>
  
          <br/>
         </div>
      
      <!-- ************************* -->
      <!--  TOP by People involved   -->
      <!-- ************************* -->
      <div id="table-top-people" v-else>
          <h3 id="" class="sub-t1">{{gtrans[76]}} <!-- Biggest lobbies in term of people --> </h3>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Lobby</th>
                <th>{{gtrans[75]}} <!-- Nb people --></th>
              </tr>
            </thead>
            <tbody>
            
            <tr v-for="p in topPeople" :key="p.idx">
               <th>{{p.idx}}</th>
              <td><a class="dark-link" :href="'/#/orga/' + p.id + '?lang=' + storage.lang">{{p.name}}</a></td>
              <td><span class="currency-parse">{{Math.round(p.value)}}</span></td>
            </tr>
              
            </tbody>
          </table>
  
         <br/>
       </div>
       
      </div><!-- End container -->
       
    </div> <!-- End block-header -->

    <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "Dataset",
          "name": "{{country.id}}",
          "description": "{{getDescription}}",
          "keywords": "{{ltrans.keywords}},{{country.id}}",
          "variableMeasured" : "{{ltrans.varMeasured}} {{country.id}}",
          "includedInDataCatalog" : "{{ltrans.catalog}}"
        }
    </script>
  </div>

</template>

<script>
import bus from "../components/EventBus.js";

import WikiMap from "../components/WikiMap.vue";
import WikiFlag from "../components/WikiFlag.vue";
import WikiInfoCountry from "../components/WikiInfoCountry.vue";
import CountryPieChart from "../components/CountryPieChart.vue";

export default {
  name: "country",
  props: ["storage"],
  components: {
    "lbl-wikimap": WikiMap,
    "lbl-wikiflag": WikiFlag,
    "lbl-wikiinfo": WikiInfoCountry,
    "lbl-pie-chart": CountryPieChart
  },
  data() {
    return {
      msg: "topPage",
      gtrans: this.storage.trans && this.storage.trans.g || [],
      ctrans: this.storage.trans && this.storage.trans.common || {},
      ltrans: this.storage.trans && this.storage.trans.country || {},
      country: [],
      showStatusGraph : !this.storage.isBot,
      showTopBudget : true
    };
  },
  methods: {
    /** */
    loadPage: function(idPage) {

      this.$http.get(this.storage.cacheUrl + "countries/" + idPage + '.json').then(
        response => {
          //console.log("response.body")
          //console.log(response.body)
          this.country = response.body;
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
       percentBruxel: function()  {return this.country.nbLobby / 11438 * 100},
       limitBruxel: function()    {return (1 - this.country.rankNbLobby / 125) * 100},
       percentCash: function()    {return this.country.cost / 2600000000 * 100},
       limitCash: function()      {return (1 - this.country.rankCost / 125) * 100},
       percentPeople: function()  {return this.country.nbLobbyist / 65803 * 100},
       limitPeople: function()    {return (1 - this.country.rankNbLobbyist / 125) * 100},

       orgaStatus: function() {
         if (!this.country.topSectors) return []
         var cpt = 0
         var self = this;
         return this.country.topSectors.map(function(c){
            var r = {}
            r.id=c[0]
            r.value=c[1]
            r.t = self.gtrans[parseInt(r.id) + 80]
            r.idx=cpt++
            return r
         })
       },

       topCities: function() { 
         if (!this.country.topCities) return []
         var cpt = 0
         return this.country.topCities.map(function(c){
             var r = {}
             r.id = c[0]
             r.value = c[1]
             r.idx = cpt++
             return r
         })
       },
       topBudget: function() { 
         if (!this.country.topLobbyCash) return []
         var cpt = 0
         return this.country.topLobbyCash.map(function(c){
             var r = {}
             r.id = c[0]
             r.name = c[1]
             r.value = c[2]
             r.idx = cpt++
             return r
         })
        },
        topPeople: function() { 
          if (!this.country.topLobbyPeople) return []
          var cpt = 0
          return this.country.topLobbyPeople.map(function(c){
             var r = {}
             r.id = c[0]
             r.name = c[1]
             r.value = c[2]
             r.idx = cpt++
             return r
          })
         },

    getDescription: function() {
         if (this.country && this.country.id) {
            return this.ltrans.descr + ' ' + this.country.id
          } else {
            return 'Lobbyland'
          }
      },
       
  },

  /** Init */
  created() {
    bus.$on("updateLang", section => {
      this.gtrans = this.storage.trans.g
      this.ltrans = this.storage.trans.country
      this.ctrans = this.storage.trans.common
    });
    this.loadPage(this.$route.params.id)
  },
  metaInfo () {
    return {
      title: "Lobbyland - " + this.getDescription,
      meta: [
              { name: "Lobbyland", content: "Lobbyland" },
              { name: "description", content: this.getDescription, id: "desc" },
              { name: "keywords", content: this.ltrans.keywords + "," +   this.country.id},
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
};
</script>

<style lang="scss" scoped>

</style>
