<template>
  <div id="wrap">

    <div class="container">
      
      <ol class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">
        <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
          <a v-bind:href="'#/?lang=' + storage.lang" itemscope itemtype="http://schema.org/Thing" itemprop="item">
            <span  itemprop="name">{{gtrans[53]}} <!--  Accueil --></span>
          </a> <meta itemprop="position" content="1" />
        </li>
        <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
          <a href="#" itemscope itemtype="http://schema.org/Thing" itemprop="item">
             <span  itemprop="name">{{gtrans[1]}} <!--  Lobby organization --></span>
          </a> <meta itemprop="position" content="2" />
        </li>
        <li class="breadcrumb-item active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
          <span  itemprop="name">{{orga.name}}</span>
           <meta itemprop="position" content="3" />
        </li>
      </ol>

      <h1>
        {{orga.name}}
      </h1>
      <hr class="my-4">
    </div>
    <div id="block-info">
      <div class="container">
        <h3 id="Informations" class="sub-t1">
           {{gtrans[23]}} <!--  Informations -->
        </h3>
        <div class="row">
          <div class="col-12 col-lg-6">
            <p>
              <i class="fa fa-university icon-start" aria-hidden="true"></i>
              <span class="info">
                {{gtrans[2]}} <!--  Category --> : </span>
              <span class="data"> {{gtrans[orga.subCategory + 80]}} </span>
            </p>

            <p>
              <i class="fa fa-pencil-alt icon-start" aria-hidden="true"></i>
              <span class="info">
                {{gtrans[3]}} <!--  Registration date --> : </span>
              <span class="data date-parse">
                 {{orga.registrationDate | date}}
              </span>
                 ({{formatDate(orga.registrationDate)}})
              <p>
                <i class="fa fa-balance-scale icon-start" aria-hidden="true"></i>
                <span class="info">
                  {{gtrans[4]}} <!--  Legal Status --> :</span>
                <span class="data"> {{orga.legal}} </span>
              </p>
              <p>
                <i class="far fa-flag icon-start" aria-hidden="true"></i>
                <span class="info">
                  {{gtrans[5]}} <!--  Country --> :</span>
                <a :href="'#/country/' + orga.country + '?lang=' + ctrans.currentLang">
                  <span class="data">
                    {{orga.country}}
                  </span>
                </a>
              </p>

              <!-- ****************** -->
              <!--      People        -->
              <!-- ****************** -->
              <p style="margin-bottom: 0.2rem;">
                <span class="info">
                  {{gtrans[6]}} <!--  Number of persons involved --> :</span>
                  <span class="data" style="font-size:1.3em; font-weight: 600;">
                    {{orga.membersCount}}
                  </span>
              </p>
              <p>
                 <span v-if="orga.membersCount < 100">
                   <i class="fa fa-male fa-2x icon-people" aria-hidden="true" v-for="n in orga.membersCount" :key="n"></i>
                 </span>
                 <span v-if="orga.membersCount > 99 && orga.membersCount < 399">
                  <i class="fa fa-male icon-people" aria-hidden="true" v-for="n in orga.membersCount" :key="n"></i>
                </span>
                <span v-if="orga.membersCount > 400">
                <i class="fa fa-male icon-people" aria-hidden="true" v-for="n in 400" :key="n"></i>
                </span>
                <span v-if="orga.membersCount > 399"> ... </span>
              </p>
          </div>
          <!-- End col -->

            <div class="col-12 col-lg-6" style="padding:0px;">
            <!-- ************ -->
            <!--     MAP      -->
            <!-- ************ -->
            <lbl-map :selected="orga.country" :clientSize="storage.clientSize"></lbl-map>
          </div>
          <!-- End col -->

        </div>
        <!-- End row -->
      </div>
      <!-- End container -->

      <div class="part-split">
        <div class="container">

          <!-- ****************** -->
          <!--    Financial       -->
          <!-- ****************** -->
          <h3 id="Financial" class="sub-t1">
            {{gtrans[7]}} <!--  Financial -->
          </h3>

          <div class="row text-center" style="font-size: 1.5em; margin-bottom: 1em;">

            <div class="col" v-if='orga.costAbsolu != "" || orga.costRange != ""'>
              <img src="https://lobbyland.eu/static/facture.svg" style=" height: 2em; margin-right: 0.5em;">
              <span class="info"> {{gtrans[8]}} <!--  Costs --> :</span>

              <div v-if='orga.costAbsolu != ""'>
                <span class="data" style="font-size: 1.3em;">
                  <span class="currency-parse"> {{orga.costAbsolu | currency }} </span> €</span>
              </div> <!-- end if -->

              <div v-else-if='orga.costRange != ""'>
                  <span class="data" style="font-size: 1.3em;" v-if="orga.costRange">
                    <span class="currency-parse">{{orga.costRange.split('-')[0]| currency }}</span>  -
                    <span class="currency-parse">{{orga.costRange.split('-')[1] | currency }}</span> €
                  </span>
                  <br/>
                  <span class="range">({{gtrans[9]}}) <!--  estimation as a range --> </span>
              </div>
            </div> <!-- End col -->

            <!-- Undeclared -->
            <div class="col" v-if='orga.costAbsolu== "" && orga.costRange== "" && orga.turnoverAbsolu== "" && orga.turnoverRange== ""'>
              <span class="info">  {{gtrans[27]}} <!--  Turnover --> :</span>
              <span class="NA"> {{gtrans[10]}} <!--  Undeclared --> </span>
            </div>

            <!-- Turnover -->
            <div class="col" v-if='orga.turnoverAbsolu!= "" || orga.turnoverRange!= ""'>
                <img src="https://lobbyland.eu/static/facture.svg" style=" height: 2em; margin-right: 0.5em;">
                <span class="info"> {{gtrans[27]}} <!--  Turnover --> :</span>

                  <div v-if='orga.turnoverAbsolu!= ""'>
                    <span class="data" style="font-size: 1.3em;">
                      <span class="currency-parse"> {{orga.turnoverAbsolu | currency }} </span> €
                    </span>
                  </div>
                  <div v-if='orga.turnoverRange != ""'>
                    <span class="data" style="font-size: 1.3em;">
                      <span class="currency-parse"> {{ (orga.turnoverRange||"").split('-')[0] | currency }} </span> -
                      <span class="currency-parse"> {{ (orga.turnoverRange||"").split('-')[1] | currency }} </span> €
                    </span>
                    <br/>
                    <span class="range"> ({{gtrans[9]}}) <!--  estimation as a range --></span>
                  </div>
            </div> <!-- End col -->

            
          </div>
          <!-- End row -->
          <div class="row">
            <hr class="col-10" />
          </div>
        </div>
        <!-- End container -->
      </div>

      <div class="container">

        <!-- ****************** -->
        <!--    Presentation    -->
        <!-- ****************** -->
        <h3 id="Presentation" class="sub-t1">
          {{gtrans[11]}} <!--  Presentation -->
        </h3>

        <!--  GOALS -->
        <div class="text-justify row">
          <i class="fa fa-tag icon-start" aria-hidden="true"></i>
          <span class="info">
            {{gtrans[12]}} <!--  Goals --> :</span>
 <transition name="fade">
          <div v-if="orga.goal && orga.goal.length > 1000">

            <div class="data content" v-bind:class="{ hideContent: isTruncatedDescr && orga.goal.length > 500 }" v-html="orga.goal">
            </div>

            <div class="show-more" v-if="orga.goal && orga.goal.length > 500">
              <hr/>
              <a role="button" @click="isTruncatedDescr = !isTruncatedDescr">
                <span v-if="isTruncatedDescr"> {{gtrans[32]}} <!--  Show more --> </span>
                <span v-else> {{gtrans[33]}} <!--  Show less --> </span>
              </a>
            </div>
          </div>
          
          <div class="data" v-else>
               {{orga.goal}}
          </div>
 </transition>
        </div>

        <br/>
        <!--  FIELDS of interest -->
        <div v-if="orga.interests != ''" class="row">
          <i class="fa fa-exchange-alt icon-start" aria-hidden="true"></i>
          <span class="info">
            {{gtrans[35]}} <!--  Fields of interest --> :</span>
            <br/>
          <p class="data text-center" style="margin-top:0.5em;">

            <span v-for="interest in interestsAsList" v-bind:key="interest">
              <a :href="'#/activity/' + interest + '?lang=' + storage.lang">
                <img :id="'ic-' + interest"
                :src="storage.ctxDist + '/static/img/interets/' + interest.slice(0,4) + interest.slice(-2) +'.svg'" class="icon-interest"/>
                </a>
              <b-tooltip :target="'ic-' + interest" delay="700">{{interest}}</b-tooltip>
            </span>
           
          </p>
        </div>

        <p v-if="orga.customers != ''">
          <i class="fa fa-exchange icon-start" aria-hidden="true"></i>
          <span class="info">
            {{gtrans[13]}} <!--  Customers --> :</span>
          <span class="data" v-html="orga.customers">
          </span>
        </p>

        <br/>
        <p v-if="orga.euInitiatives != ''">
          <i class="fa fa-bullseye icon-start" aria-hidden="true"></i>
          <span class="info"> {{gtrans[14]}} <!-- EU initiatives --> :</span><br/>
          <span class="data" v-html="orga.euInitiatives"> </span>
        </p>
        <br/>
      </div>
      <!-- End container -->

      <div class="part-split">
        <div class="container">

          <!-- ****************** -->
          <!--      Contact       -->
          <!-- ****************** -->
          <h3 id="Contact" class="sub-t1"> {{gtrans[15]}} <!--  Contact --> </h3>

          <p>
            <i class="fa fa-building icon-start" aria-hidden="true"></i>
            <span class="info">
              {{gtrans[16]}} <!--  Address --> :</span>
            <span class="data"> {{orga.headAddress}}, {{orga.headPostCode}}  {{orga.headCity}} {{orga.country}})</span>
          </p>
          <p>
            <i class="fa fa-phone icon-start" aria-hidden="true"></i>
            <span class="info">
              {{gtrans[17]}} <!-- Head office phone --> :</span>
            <span class="data">
               {{orga.headPhone}}
            </span>
          </p>

          <p>
            <i class="fa fa-child icon-start" aria-hidden="true"></i>
            <span class="info">
              {{gtrans[18]}} <!--  People in charge --> :</span>
            <span class="data">
              {{orga.boss}} 
            </span>
            <span class="info" style="margin-left: 3rem;">
              {{gtrans[19]}} <!--  Position --> :</span>
            <span class="data">
               {{orga.bossPosition}}
            </span>
          </p>

          <p>
            <i class="fa fa-sitemap icon-start" aria-hidden="true" v-if="orga.membership"></i>
            <span class="info">
              {{ gtrans[20] }} <!--  Membership --> :</span>
            <span class="data" v-html="orga.membership">
             
            </span>
          </p>

            <p v-if="orga.memberOrga != ''">
              <i class="fa fa-users icon-start" aria-hidden="true"></i>
              <span class="info">
                {{ gtrans[21] }} <!--  Member organisations --> :</span>
              <span class="data" v-html="orga.memberOrga">
              </span>
            </p>

            <p>
              <i class="fa fa-at icon-start" aria-hidden="true"></i>
              <span class="info">
                {{gtrans[22]}} <!--  Website --> :</span>
              <a class="data" :href="orga.web">
                {{ orga.web }} 
              </a>
            </p>

        </div><!-- End container -->

      </div><!-- End block-info -->

        <p class="text-center" style="color: ##6b6b6b;" v-if="orga.lastUp != ''">
          {{gtrans[38]}} <!--  LastUpdate -->
            <span class="data date-parse">
              {{ orga.lastUp | date }}
            </span>
        </p>

    </div>
    <!-- End block-header -->

    <lbl-error-modal ref="errorModal" :storage="storage" :id="$route.params.id"/>

    <lbl-report-bug ref="reportError" :storage="storage" :id="$route.params.id"/>

<script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Dataset",
      "name": "{{orga.name}}",
      "description": "{{getDescription}}",
      "keywords": "Organization,lobby,europe",
      "variableMeasured" : "{{ltrans.varMeasured}}",
      "identifier" : "{{orga.id}}",
      "includedInDataCatalog" : "{{ltrans.lobbyCatalog}}",
      "temporalCoverage" : "{{orga.registrationDate | dateYMD}}/{{orga.lastUp| dateYMD}}"
    }
</script>

  </div>
</template>

<script>
import bus from "../components/EventBus.js";
import Map from "../components/Map.vue";
import ErrorModal from "../components/ErrorModal.vue";
import ReportBug from "../components/ReportBug.vue";

export default {
  name: "app",
  props: ["storage", "lang"],
  components: {
    "lbl-map": Map,
    "lbl-error-modal": ErrorModal,
    "lbl-report-bug": ReportBug
  },
  data() {
    return {
      msg: "topPage",
      isTruncatedDescr: !this.storage.isBot,
      gtrans: this.storage.trans && this.storage.trans.g || [],
      ltrans: this.storage.trans && this.storage.trans.orga || {},
      ctrans: this.storage.trans && this.storage.trans.common || {},
      orga: {}
    };
  },
  methods: {
    /** */
    loadOrga: function(idOrga) {

      this.$http.get(this.storage.cacheUrl + "orga/" + idOrga + '.json').then(
        response => {
          //console.log(response)
          this.orga = response.body;
        },
        response => {
          console.error("error loading page");
          
          this.$refs.errorModal.show()
        }
      );
    },

    /** since {years} years and {months} months */
    formatDate: function(date) {
      if (date && this.gtrans[1]) {
        var month =
          Math.floor(((new Date() - new Date(date)) / 2592000000) % 12) - 1;
        var year = Math.floor((new Date() - new Date(date)) / 31536000000);

        if (month > 0 || year > 0) {
          var res = "";
          if (year > 0)
            res += this.gtrans[28] + " " + year + " " + this.gtrans[29];
          res += " " + this.gtrans[31] + " " + month + " " + this.gtrans[30];

          return res;
        }
      } else return "N/A";
    },

  },
  watch: {
    '$route.params.id': function (id) {
      this.loadOrga(this.$route.params.id)
    }
  },
    computed: {
       getDescription: function() {
         if (this.orga && this.orga.name) {
            return  this.orga.name + ' european lobby : ' + this.orga.goal.split(' ').slice(0,30).join(' ') + " ..."
          } else {
            return 'Lobbyland'
          }
      },
     interestsAsList: function() {
         if (this.orga && this.orga.interests) {
            // console.log(this.orga.interests.split(", ").map(x=> x.trim().split('-')[0]).filter(x => x !== 'Financial Services and Capital Markets Union'))
            return this.orga.interests.split(", ")
                                      .map(x=> x.trim()
                                                .split('-')[0])
                                      .filter(x => x !== 'Financial Services and Capital Markets Union')
          } else {
            return []
          }
      },
    },

  /** Init */
  created() {
    bus.$on("updateLang", section => {
      this.gtrans = this.storage.trans.g
      this.ctrans = this.storage.trans.common
      this.ltrans = this.storage.trans.orga
    });
    this.loadOrga(this.$route.params.id)

  },
  metaInfo () {
    return {
      title : "Lobbyland - " + this.orga.name,
      meta: [
              { name: "Lobbyland", content: "Lobbyland" },
              { name: "description", content: this.getDescription, id: "desc" },
              { name: "keywords", content: this.ltrans.keywords + ',' +  this.orga.name},
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

  .icon-interest {
    padding: 0.3em;
    margin-bottom: 1em;
  }

  .icon-people {
    margin: 1px;
    margin-bottom: 2px;
  }
  
</style>
