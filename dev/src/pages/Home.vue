<template>
  <div>

    <div id="particles-js" class="jumbotron" style="background: #c51162; min-height: 40vh; position:relative; color: #efebe9;">
      <vue-particles color="#dedede"></vue-particles>

      <div class="container text-center" style="">
        <h1 class="" style="font-weight: 300;    font-size: 3em; line-height: 1.2em; margin-bottom: 1em;">
          {{trans[36]}}
          <!--  title  -->
        </h1>
        <h3>
          <span>11 378</span> {{trans[37]}}
          <!--  organizations are referenced  -->
        </h3>
      </div>
    </div>

    <div class="container" style="padding-top:0em;">
      <div class="row">

        <div class="col-md-4">
          <div class="card lbl-card-home">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fa fa-eye fa-1-5x" aria-hidden="true"> </i>
                {{trans[39]}}
                <!--  daily update  -->
              </h5>
              <p class="card-text">{{trans[40]}}.<!-- data from europe commission -->
              </p>

            </div>
            <!-- End card-body -->
          </div>
          <!-- End card -->
        </div>
        <!-- End col -->

        <div class="col-md-4">
          <div class="card lbl-card-home">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fa fa-compass fa-1-5x" aria-hidden="true"> </i>
                {{trans[41]}}
                <!-- Org indep -->
              </h5>
              <p class="card-text">{{trans[42]}}.
                <!-- citoyen et indep -->
              </p>

            </div>
            <!-- End card-body -->
          </div>
          <!-- End card -->
        </div>
        <!-- End col -->

        <div class="col-md-4">
          <div class="card lbl-card-home">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fa fa-chart-bar fa-1-5x" aria-hidden="true"> </i>
                {{trans[43]}}.
                <!-- detailled -->
              </h5>
              <p class="card-text"> {{trans[44]}}.
                <!-- stats -->
              </p>

            </div>
            <!-- End card-body -->
          </div>
          <!-- End card -->
        </div>
        <!-- End col -->

      </div><!-- End row -->

    </div><!-- End container -->

    <div class="part-split">
      <div class="container">

        <!-- LOBBYS BY COUNTRIES -->
        <h2 class="">{{trans[121]}}<!--Lobbys by Countries--></h2>

        <div class="row text-center" style="margin-top:2em;">

            <div class="col-md-3 home-img-col"><a :href="'#/country/China?lang=' + storage.lang">
              <img :src="storage.ctxDist + '/static/img/china.png'" class="countries-img"/></a></div>

            <div class="col-md-3 home-img-col"><a :href="'#/country/United states?lang=' + storage.lang">
              <img :src="storage.ctxDist + '/static/img/usa.png'" class="countries-img"/></a></div>

            <div class="col-md-3 home-img-col"><a :href="'#/country/Germany?lang=' + storage.lang">
              <img :src="storage.ctxDist + '/static/img/germany.png'" class="countries-img"/></a></div>

            <div class="col-md-3 home-img-col"><a :href="'#/country/Switzerland?lang=' + storage.lang">
              <img :src="storage.ctxDist + '/static/img/suisse.png'" class="countries-img"/></a></div>

        </div>
        <div class="row text-center" style="margin-top:2em;">
            <div class="col-md-12">
              <a :href="'#/countries?lang=' + storage.lang" class="no-underline">
              
          <b-btn class="mt-3" variant="outline-primary" block
             style="margin-bottom:2em;font-size:1.5em;padding:0.7em;" 
             bg-variant="secondary" 
             text-variant="dark">

                  <i class="fa fa-globe"></i>
                  {{trans[118]}}<!--Liste des différents pays-->
                </b-btn>
              </a>
          </div><!-- End col -->
        </div><!-- End row -->

      </div><!-- End container -->
    </div><!-- End part-split -->

    <div class="container">

        <h2 id="AllInterets" :storage="storage" class="sub-t1">{{trans[174] /* Les organisations par domaines d'activités */}}</h2>

      <all-interets :storage="storage"></all-interets>

      <div class="row text-center" style="margin-top:2em;">
        <div class="col-md-12">

          <a :href="'#/activities?lang=' + storage.lang" class="no-underline">

            <b-btn class="mt-3" variant="outline-secondary" block
             style="margin-bottom:2em;font-size:1.5em;padding:0.7em;" 
             bg-variant="secondary" 
             text-variant="dark">

              <i class="fas fa-thumbtack"></i>
              {{trans[179]}}<!--Liste des différents pays-->
            </b-btn>
          </a>
      </div><!-- End col -->
    </div><!-- End row -->
      <br/>
    </div><!-- End container -->

  </div>
</template>


   <script>

import AllInteretsList from "../components/AllInteretsList.vue";
import bus from '../components/EventBus.js'


export default {
  name: 'home',
  props: ['storage'],

  components: {
    "all-interets": AllInteretsList
  },
  data() {
    return {
      trans: this.storage.trans || []
    }
  },
  created() {
    bus.$on('updateLang', section => {
      this.trans = this.storage.trans
    });
  },
  computed: {
       getDescription: function() { return "Lobbyland is a european lobbyist register."},
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
}
</script>

<style>
.countries-img {
  height: 120px;
  filter: grayscale(50%);
}
.home-img-col {
  margin-bottom: 2em;
}

@media (min-width: 900px) {

  .card.lbl-card-home {
      min-height: 220px;

  }
}

.card.lbl-card-home {
    margin-bottom: 1.5em;
}
</style>
