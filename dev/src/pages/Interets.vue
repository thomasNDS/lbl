<template>
  <div>

      <div class="container text-center">
        <h1 class="display-4">{{gtrans[35]}} <!-- Interets --></h1>

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
      </div>
      
      <!-- LOADING -->
      <p class="text-center">
        <span v-if="interets.length == 0" class="fa fa-spinner fa-spin fa-2x fa-fw" style="margin-top:2em;"></span>
      </p>
      <div class="container text-center">

        <!-- LIST VIEW -->

        <b-table  :items="interets"
                  :striped="true"
                  :fields="fields"
                   v-if="view == 1">

           <template slot="interet" slot-scope="row">
            <a style="color:#002d54;" :href="'#/activity/' + row.item.id.split('-')[0] + '?lang=' + storage.lang"> 
            {{gtrans[121 + parseInt(row.item.idLang)]}} </a>
          </template>

           <template slot="lobbys" slot-scope="row">
            {{row.item.nbLobby}}
          </template>

        </b-table>

        <!-- CARD VIEW -->
        <a v-if="view == 0"
         :href="'#/activity/' + interet.id  + '?lang=' + storage.lang" v-for="interet in interets" :key="interet.id">
          <b-card no-body class="card-block" >
        
              <b-card-img :src="storage.ctxDist + '/static/img/interets/' + compactIdFun(interet) +'.svg'" 
                          :alt="gtrans[121 + parseInt(interet.idLang)] + ' icon'" class="icon-card"
                          top></b-card-img>

              <h5 class="title-card"> 
                {{gtrans[121 + parseInt(interet.idLang)]}}
              </h5>

              <b-card-footer>
                  <i class="fa fa-building icon-start" aria-hidden="true"></i> 
                  <span>{{interet.nbLobby}} lobbys</span>
                  <br/>

              </b-card-footer>
          </b-card>
        </a>

      </div>
  </div>
</template>

<script>
import bus from "../components/EventBus.js";

export default {
  name: "activities",
  props: ["storage"],

  data() {
    return {
      interets: [],
      gtrans: this.storage.trans && this.storage.trans.g || [],
      view: 0, // 0: card, 1: list
    };
  },
  created() {
    bus.$on("updateLang", section => {
      this.gtrans = this.storage.trans.g;
    });
    this.loadPage();
  },
  methods: {
    
    /** */
    compactIdFun: function(int)  {
      if (int.id) {
        return int.id.slice(0,4) +  int.id.slice(-2)
      } else {
        return "loading"
      }
    },
    /** */
    loadPage: function(idPage) {
      this.$http.get(this.storage.cacheUrl + "interets.json").then(
        response => {
          //console.log(response.body.interets)
          this.interets = response.body.interets;
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
      return "Differents interests of actives europeans lobbys in Brussels.";
    },
    fields : function() {
      var res =  [{key:'interet', label: this.gtrans[172]},
                  {key:'lobbys', label: 'lobbys'}]

      if (this.filterEu == 2) {
        res.push({key:'Europe', label: 'Europe'})
      }
      return res;
    }

  },
  metaInfo () {
    return {title: "Lobbyland - Activities",
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

<style lang="scss" scoped>

.title-card {
  padding-left:5px;
  min-height: 2.0em;
  line-height: 1em;
  margin-bottom: 1em;
}

.icon-card {
  padding: 1em;
  opacity: 0.5;
  max-height: 90px;
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
