<template>
  <div id="wrap">

    <div class="container">
       <ol class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">
        <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
          <a v-bind:href="'#/?lang=' + storage.lang" itemscope itemtype="http://schema.org/Thing" itemprop="item">
            <span itemprop="name">{{trans[53]}} <!--  Accueil --></span>
          </a><meta itemprop="position" content="1" />
        </li>
        <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
          <a :href="'#/activities?lang=' + storage.lang" itemscope itemtype="http://schema.org/Thing" itemprop="item">
             <span itemprop="name">{{trans[171]}} <!-- Activities --></span>
          </a><meta itemprop="position" content="2" />
        </li>
        <li class="breadcrumb-item active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
            <span itemprop="name">{{trans[121 + parseInt(interet.idLang)]}}</span>
          <meta itemprop="position" content="3" />
        </li>
      </ol>

      <h1>
            <img id="titleImg"
              :src="storage.ctxDist + '/static/img/interets/' + compactId +'.svg'" 
              class="icon-global"/>
            {{trans[121 + parseInt(interet.idLang)]}}
      </h1>
      <hr class="my-4"/>
    </div>
    <div id="block-info">
      <div class="container">
              
        <h2 id="Presentation" class="sub-t1">
              {{trans[172] /* Statistiques */}} <!-- Statistiques -->
        </h2>
        <div class="">
        
          <p>
          {{Math.round(interet.perNbLobby * 1000)/10}} % {{trans[161] /* des lobbys déclares */}}.<br/>
          Soit {{interet.nbLobby}} {{trans[162] /* organisations et */}} {{Math.round(interet.nbLobbyist)}}
           {{trans[71] /* personnes impliques */}}. <br/> 
          </p>
          <p class="lbl-badge"><span class="eme-parse">{{interet.rankNbLobby}}</span>/ 37</p>  

          <div class="lbl-progress">
            <i :class="{'lbl-selected': (interet.rankNbLobby <= 38 - i*(37/18))}" v-for="i in 18" :key="i" class="fa fa-male icon-stat" aria-hidden="true"></i>
          </div>
          <hr/>

          <p>
            {{trans[163] /* On estime que */}} {{Math.round(interet.cash) | currency}} € {{trans[164] /* sont dépensés chaque */}}.<br/>
            {{trans[67] /* Soit */}} {{(interet.cash /interet.nbLobby).toFixed(0) | currency }} € {{trans[165] /* en moyenne par organisation */}}
             {{(interet.cash /511800000).toFixed(2) }} € {{trans[166] /* by */}} <span id="citizen" class="lbl-has-tooltip">{{trans[167] /* citoyen européen */}}</span>.
            <b-tooltip target="citizen" delay="500" placement="bottom" triggers="hover click"> 
             {{trans[168] /* Sur la base de */}} 511.8 {{trans[169] /* millions de citoyens */}}. 
                <b-link class="text-secondary" href="http://ec.europa.eu/eurostat/tgm/table.do?tab=table&language=en&pcode=tps00001&tableSelection=1&footnotes=yes&labeling=labels&plugin=1">
                 {{trans[170] /* Données Eurostat 2017 */}}
                </b-link>
                </b-tooltip>
              <br/>
            </p>
            <p class="lbl-badge"><span class="eme-parse">{{interet.rankCash}}</span>/ 37</p>  

            <div class="lbl-progress">
              <i :class="{'lbl-selected': (interet.rankCash <= 38 - i*(37/18))}" v-for="i in 18" :key="i" class="fas fa-euro-sign icon-stat" aria-hidden="true"></i>
            </div>
            <br/>
         </div> <!-- End row -->
      </div><!-- End container -->
      
      <div class="part-split">
        <div class="container">
        
        <!-- ****************** -->
        <!--    Countries       -->
        <!-- ****************** -->

      <h2 id="Countries" class="sub-t1">{{trans[45] /* Countries */}}</h2>

        <lbl-map-activities :selected="interet.topCountriesNb" :title="trans[121 + parseInt(interet.idLang)]"></lbl-map-activities>

        <hr/><br/><br/>

        <b-button-group class="float-right">
          <b-button v-on:click="viewCountry = 0" :variant="viewCountry == 0 && 'dark' || 'default'">
            <i class="fa fa-users" aria-hidden="true"/>
          </b-button>
          <b-button v-on:click="viewCountry = 1" :variant="viewCountry == 1 && 'dark' || 'default'">
            <i class="fas fa-euro-sign" aria-hidden="true"/>
          </b-button>
        </b-button-group>

      <br/><br/>

        <!-- TOP COUNTRY PEOPLE -->
        <b-table  :items="interet.topCountriesNb"
                  :striped="true"
                  v-if="viewCountry == 0"
                  :fields="[{key:'index', label: 'index'}, {key:'country', label: this.trans[5]}, {key:'nbLobby', label:  this.trans[56]}]">

          <template slot="index" slot-scope="data">
            {{data.index + 1}}
          </template>

          <template slot="country" slot-scope="row">
            <a style="color:#002d54;" :href="'#/country/' + row.item[0]"> {{row.item[0]}} </a>
          </template>

          <template slot="nbLobby" slot-scope="row">
            {{row.item[1]}}
          </template>

        <!-- TOP COUNTRY CASH -->
        </b-table>
                <b-table  :items="interet.topCountriesCash"
                  :striped="true"
                  v-if="viewCountry == 1"
                  :fields="[{key:'index', label: 'index'}, {key:'country', label: this.trans[5]}, {key:'cash', label: this.trans[74]}]">

          <template slot="index" slot-scope="data">
            {{data.index + 1}}
          </template>

          <template slot="country" slot-scope="row">
            <a style="color:#002d54;" :href="'#/country/' + row.item[0]"> {{row.item[0]}} </a>
          </template>

          <template slot="cash" slot-scope="row">
            {{Math.round(row.item[1]) | currency }} €
          </template>
        </b-table>

          <br/>
        </div><!-- End container -->
      </div>
        <div class="container">
        
        <!-- ****************** -->
        <!--    Organisations   -->
        <!-- ****************** -->
        <b-button-group class="float-right">
          <b-button v-on:click="viewOrga = 0" :variant="viewOrga == 0 && 'dark' || 'default'">
            <i class="fa fa-users" aria-hidden="true"/>
          </b-button>
          <b-button v-on:click="viewOrga = 1" :variant="viewOrga == 1 && 'dark' || 'default'">
            <i class="fas fa-euro-sign" aria-hidden="true"/>
          </b-button>
        </b-button-group>

        <h2 id="Lobbys" class="sub-t1">Lobbys</h2>
        
          <!-- TOP LOBBY PEOPLE -->
          <b-table  :items="interet.topLobbyPeople"
            :striped="true"
            v-if="viewOrga == 0"
            :fields="[{key:'index', label: 'index'}, {key:'lobby', label: this.trans[1]}, {key:'nbLobby', label: this.trans[56]}]">

            <template slot="index" slot-scope="data">
              {{data.index + 1}}
            </template>

            <template slot="lobby" slot-scope="row">
              <a style="color:#002d54;" :href="'#/orga/' + row.item[0]"> {{row.item[1]}} </a>
            </template>

            <template slot="nbLobby" slot-scope="row">
              {{row.item[2]}}
            </template>
          </b-table>

          <!-- TOP LOBBY CASH -->
          <b-table  :items="interet.topLobbyCash"
                    :striped="true"
                    v-if="viewOrga == 1"
                    :fields="[{key:'index', label: 'index'}, {key:'lobby', label: this.trans[1]}, {key:'cash', label: this.trans[74]}]">

          <template slot="index" slot-scope="data">
              {{data.index + 1}}
            </template>

            <template slot="lobby" slot-scope="row">
              <a style="color:#002d54;" :href="'#/orga/' + row.item[0]"> {{row.item[1]}} </a>
            </template>

            <template slot="cash" slot-scope="row">
              {{Math.round(row.item[2]) | currency }} €
            </template>
          </b-table>
          <br/>
        </div><!-- End container -->

        <div class="part-split">
          <div class="container">

             <h2 id="AllInterets" :storage="storage" class="sub-t1">{{trans[173] /* Autres interets */}}</h2>

            <all-interets :storage="storage"></all-interets>
            <br/>
          </div><!-- End container -->
        </div>  <!-- part-split -->

       <p class="text-center" style="color: ##6b6b6b;" v-if="interet.lastUpdate && interet.lastUpdate !== ''">
          {{trans[38]}} <!--  LastUpdate -->
            <span class="data date-parse">
              {{ interet.lastUpdate | date }}
            </span>
        </p>
    </div> <!-- End block-header -->

    <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "Dataset",
          "name": "{{trans[121 + parseInt(interet.idLang)]}}",
          "description": "{{getDescription}}",
          "keywords": "interest,lobby,europe",
          "variableMeasured" : "count, budgets, costs",
          "identifier" : "{{interet.id}}",
          "includedInDataCatalog" : "Lobbys interests",
          "temporalCoverage" : "{{interet.lastUpdate | dateYMD}}"
        }
    </script>

  </div>

</template>

<script>
import bus from "../components/EventBus.js";
import AllInteretsList from "../components/AllInteretsList.vue";
import MapActivities from "../components/MapActivities.vue";

export default {
  name: "interet",
  props: ["storage"],
  components: {
    "all-interets": AllInteretsList,
    "lbl-map-activities": MapActivities
  },
  data() {
    return {
      trans: this.storage.trans && this.storage.trans.g || [],
      interet: [],
      interets: [],
      viewCountry : 0, // 0 : nb, 1 : cash
      viewOrga : 0, // 0 : nb, 1 : cash
    };
  },
  methods: {
    /** */
    loadPage: function(idPage) {

      this.$http.get(this.storage.cacheUrl + "interet/" + idPage + '.json').then(
        response => {
          //console.log("response.body")
          //console.log(response.body)
          this.interet = response.body;
        },
        response => {
          console.error("error loading page");
        }
      );
    },
    /** */
    loadInterets: function() {

      if (this.storage.interets) {
        this.interets = this.storage.interets
      } else {

        this.$http.get(this.storage.cacheUrl + "interets.json").then(
          response => {
          //  console.log("response.body")
          //  console.log(response.body)
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
      this.trans = this.storage.trans.g
    });
    this.loadPage(this.$route.params.id)

    this.loadInterets()
  },
  metaInfo () {
    return {title: "Lobbyland - " + this.getDescription,
            meta: [
              { name: "Lobbyland", content: "Lobbyland" },
              { name: "description", content: this.getDescription, id: "desc" },
              { name: "keywords", content: "europe,lobby,transparency," +  this.interet.id},
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

.icon-global {
  width: 60px;
  margin-right:20px;
  vertical-align: sub;
}

.lbl-has-tooltip {
  text-decoration: underline grey;
}

</style>
