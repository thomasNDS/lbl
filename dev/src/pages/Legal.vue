<template>
  <div>

    <div class="lbl-page-header" style="">
        <div class="container text-center" style="padding:1em;">
          <h1 class="display-3">{{trans[25]}} <!-- Legal --></h1>
        </div><!-- End container -->
    </div><!-- End jumbotron -->

    <div class="container">

      <h2>
        {{trans[46]}} <!-- Hébergeur -->
      </h2>
      <p>
        
        {{trans[47]}} <!-- website -->
          <a href="https://cloud.google.com">Google Cloud platform</a>
          {{trans[48]}} <!-- google address -->
          Gordon House, Barrow Street, Dublin 4,Ireland.
          
      </p>
      <br/>
      <h2>
        {{trans[51]}} <!--  Données personnelles -->
      </h2>
      <p>
        {{trans[52]}}. <!-- collecte data -->
      </p>

      <div>Some icons made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0</div>
      <!--https://www.onlinewebfonts.com/icon/561835-->
      <!--https://www.onlinewebfonts.com/icon/419836-->
      <!--https://www.onlinewebfonts.com/icon/365143-->
      <!--https://www.onlinewebfonts.com/icon/493708-->
      <!--https://www.onlinewebfonts.com/icon/365143-->
      <!--https://www.onlinewebfonts.com/icon/365143-->
      <!--https://www.onlinewebfonts.com/icon/365143-->
      <!--https://www.onlinewebfonts.com/icon/365143-->
      <!--https://www.onlinewebfonts.com/icon/365143-->

      <br/>
      <div class="row">

        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
                {{trans[49]}} <!-- See disclaimer -->
              </h5>
              <p class="card-text">
                <p>
                   {{trans[50]}} <!-- Origin of data -->
                </p>
                <a href="#/Disclaimer" class="btn btn-primary"> Details</a>

            </div>
            <!-- End card-body -->
          </div>
          <!-- End card -->
        </div>
        <!-- End col -->
      </div>
      <!-- End row -->
      <br/>

    </div>

  </div>

  </div>
</template>

<script>
import bus from '../components/EventBus.js'

export default {
  name: 'legal',
  props: ['storage'],

  data() {
    return {
        trans: this.storage.trans && this.storage.trans.g || []
    }
  },
  created() {
    bus.$on('updateLang', section => {
      this.trans = this.storage.trans.g
    });
  },
  computed: {
       getDescription: function() { return "Lobbyland - Legal informations"},
  },
  metaInfo () {
    return {meta: [
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
}
</script>

<style>

</style>
