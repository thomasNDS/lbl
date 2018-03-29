<template>
  <div>

      <div class="container text-center">
        <h1 class="display-4">{{gtrans[45]}} <!-- Countries --></h1>

        <!-- Button bar -->
        <b-row align-h="end">
           <!-- View -->
          <b-button-group style="margin-right:2.7em; margin-bottom:0.4em;">

            <b-button id="cards" :variant="view == 0 && 'link' || 'default'" v-on:click="view = 0">
              <i class="fa fa-th-large " aria-hidden="true"></i> 
            </b-button>

            <b-button id="list" :variant="view == 1 && 'link' || 'default'" v-on:click="view = 1">
              <i class="fa fa-list" aria-hidden="true"></i> 
            </b-button>
          </b-button-group>
        </b-row>
        <b-row align-h="between">

            <!-- SORT -->
            <b-col sm style="text-align: left; padding:0.2em">
              <b-button-group style="margin-left:2em;">
                  <i class="fa fa-sort i-sort" aria-hidden="true"></i> 
    
                  <b-button id="lobbys" :variant="sort == 1 && 'link' || 'default'" v-on:click="sort = 1">lobbys</b-button>

                  <b-button id="cash" :variant="sort == 0 && 'link' || 'default'" v-on:click="sort = 0"><!-- cash -->{{gtrans[74]}}</b-button>       

                  <b-button id="lobbystes" :variant="sort == 2 && 'link' || 'default'" v-on:click="sort = 2"><!-- lobbystes -->{{gtrans[109]}}</b-button>
              </b-button-group>
              <b-tooltip target="cash" delay="1000">{{gtrans[113]}}</b-tooltip>
              <b-tooltip target="lobbys" delay="1000">{{gtrans[114]}}</b-tooltip>
              <b-tooltip  target="lobbystes" delay="1000">{{gtrans[115]}}</b-tooltip>
            </b-col>

            <!-- FILTERS -->
            <b-col sm style="text-align: end; padding:0.2em">
              <b-button-group style="margin-right:2.5em;">
                  <i class="fa fa-filter  i-sort" aria-hidden="true"></i> 
                  <b-button :variant="filterEu == 2 && 'link' || 'default'"  v-on:click="filterEu = 2"><!-- All -->{{gtrans[110]}}</b-button>
                  
                  <b-button id="eu" :variant="filterEu == 1 && 'link' || 'default'" v-on:click="filterEu = 1"><!-- EU -->{{gtrans[111]}}</b-button>

                  <b-button id="noneu" :variant="filterEu == 0 && 'link' || 'default'" v-on:click="filterEu = 0"><!-- non EU -->{{gtrans[112]}}</b-button>
                  
              </b-button-group>
              <b-tooltip  target="eu" delay="1000">{{gtrans[116]}}</b-tooltip>
              <b-tooltip  target="noneu" delay="1000">{{gtrans[117]}}</b-tooltip>
            </b-col>
        </b-row>
      </div>

      <!-- LOADING -->
      <p class="text-center">
        <span v-if="countries.length == 0" class="fa fa-spinner fa-spin fa-2x fa-fw" style="margin-top:2em;"></span>
      </p>
      <div class="container text-center">

        <!-- LIST VIEW -->

        <b-table  :items="filteredCountries"
                  :striped="true"
                  :fields="fields"
                   v-if="view == 1"
                   responsive>

           <template slot="country" slot-scope="row">
           <a style="color:#002d54;" :href="'#/country/' + row.item.id + '?lang=' + storage.lang"> {{row.item.id}} </a>
          </template>
          <template slot="lobbys" slot-scope="row">
            {{row.item.nborg}}
          </template>
          <template slot="budget" slot-scope="row">
            <span v-if="row.item.budget !== '#N/A' && row.item.budget > 0">{{row.item.budget | currency}}€</span>
            <span v-else style="font-size:0.75em;">N/A</span>
          </template>
          <template slot="lobbyists" slot-scope="row">
            {{row.item.nblobbys}}
          </template>
          <template slot="Europe" slot-scope="row">
             <img v-if="row.item.isEu" :src="storage.ctxDist + '/static/img/europe.png'" style="height:1.3em;" />
          </template>
        </b-table>

        <!-- CARD VIEW -->
        <a v-if="view == 0"
         :href="'#/country/' + country.id + '?lang=' + storage.lang" v-for="country in filteredCountries" :key="country.id">
          <b-card no-body class="card-block" >

              <b-card-img v-if="country.isEu" :src="storage.ctxDist + '/static/img/europe.png'"
                          alt="europe flag" class="flag-eu"
                          top></b-card-img>

              <h5 style="padding-left:5px;"> {{country.id}}</h5>

              <b-card-footer>
                  <i class="fa fa-building icon-start" aria-hidden="true"></i> 
                  <span>{{country.nborg}} lobbys</span>
                  <br/>
                  
                  <span v-if="country.budget !== '#N/A'"><i class="fas fa-euro-sign icon-start" aria-hidden="true" ></i>
                  <span>{{country.budget | currency}}</span>
                  <br/></span>

                  <i class="fa fa-male icon-start" aria-hidden="true"></i>
                  <span>{{country.nblobbys}} {{gtrans[109]}}</span>
              </b-card-footer>
          </b-card>
        </a>

      </div>
  </div>
</template>

<script>
import bus from "../components/EventBus.js";

export default {
  name: "countries",
  props: ["storage"],

  data() {
    return {
      msg: "topPage",
      countries: [],
      gtrans: this.storage.trans && this.storage.trans.g || [],
      filterEu: 2, // 2:all, 0: non Eu, 1: only Eu
      sort: 1, // 0:cash, 1: lobbys, 2: lobbyist
      view: 0, // 0: card, 1: list
    };
  },
  created() {
    bus.$on("updateLang", section => {
      this.gtrans = this.storage.trans.g
    });
    this.loadPage();
  },
  methods: {
    /** */
    loadPage: function(idPage) {
      this.$http.get(this.storage.cacheUrl + "countries.json").then(
        response => {
          this.countries = response.body.data;
        },
        response => {
          console.error("error loading page");
          console.error(response);
        }
      );
    }
  },
  computed: {
    getDescription: function() {
      return "List of all actives countries in european lobbying in Brussels.";
    },
    filteredCountries : function() {
      var res = this.countries

      if (this.filterEu < 2) {
        res = res.filter(c => c.isEu == this.filterEu)
      }
      switch (this.sort) {
        case 0 :
        // cash
        res = res.sort(function(a, b) { return a.rankbudget - b.rankbudget })
        break;
        case 1 :
        // lobby 
        res = res.sort(function(a, b) { return a.ranknborg - b.ranknborg })
        break;
        case 2 :
        default :
        // lobbyist
        res = res.sort(function(a, b) { return a.ranknblobbys - b.ranknblobbys })
      } 
      return res
    },
    fields : function() {
      var res =  [{key:'country', label: this.gtrans[5]}, 
                  {key:'budget', label: this.gtrans[74]}, 
                  {key:'lobbys', label: 'Lobbys'},
                  {key:'lobbyists', label: this.gtrans[109]},
                ]

      if (this.filterEu == 2) {
        res.push({key:'Europe', label: 'Europe'})
      }
      return res;
    }

  },
  metaInfo () {
    return {
      title: "Lobbyland - " + this.getDescription,
      meta: [
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
};
</script>

<style>

.card-img-top.flag-eu {
  padding-top:5px; 
  height: 24px; 
  width: auto; 
  float:right;
  padding-right: 4px;
}

.card.card-block {
  color: #0a2136;
  width: 200px;
  display: inline-block;
  margin: 0.3em;
  vertical-align: top;
}
.card.card-block:hover {
  color: rgb(44, 3, 22);
  border: solid 1px #C51162;
}

.btn.btn-default {
  border: solid 1px rgb(90, 90, 90);
}

.btn.btn-link {
  color: black;
  border: solid 1px rgb(90, 90, 90);
}
.btn.btn-link:hover, .btn.btn-link:focus {
  color: grey;
  border: solid 1px grey;
}
.fa.i-sort {
   font-size: 1.1em;
    vertical-align: bottom;
    padding: 0.5em;
    color: rgb(88, 88, 88);
}

</style>
