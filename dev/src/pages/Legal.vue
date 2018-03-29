<template>
  <div>

    <div class="lbl-page-header" style="">
        <div class="container text-center" style="padding:1em;">
          <h1 class="display-3">{{ctrans.legalStatus}}</h1>
        </div><!-- End container -->
    </div><!-- End jumbotron -->

    <div class="container">

      <h2>
        {{gtrans[46]}} <!-- Hébergeur -->
      </h2>
      <p>
        
        {{gtrans[47]}} <!-- website -->
          <a href="https://cloud.google.com">Google Cloud platform</a>.<br/>
          {{gtrans[48]}} <!-- google address -->
          Gordon House, Barrow Street, Dublin 4,Ireland.
          
      </p>
      <br/>
      <h2>
        {{gtrans[51]}} <!--  Données personnelles -->
      </h2>
      <p>
        {{gtrans[52]}}. <!-- collecte data -->
      </p>

      <div>{{ltrans.someIcons}}<a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> {{ltrans.licensed}} 
      <a :href="'https://creativecommons.org/licenses/by/3.0' + ltrans.extCcWeb">CC BY 3.0</a></div>

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
                {{gtrans[49]}} <!-- See disclaimer -->
              </h5>
              <p class="card-text">
                <p>
                   {{gtrans[50]}} <!-- Origin of data -->
                </p>
                <a :href="'#/Disclaimer?lang=' + storage.lang" class="btn btn-primary"> Details</a>

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

</template>

<script>
import bus from '../components/EventBus.js'

export default {
  name: 'legal',
  props: ['storage'],

  data() {
    return {
        gtrans: this.storage.trans && this.storage.trans.g || [],
        ctrans: this.storage.trans && this.storage.trans.common || {},
        ltrans: this.storage.trans && this.storage.trans.legal || {}
    }
  },
  created() {
    bus.$on('updateLang', section => {
      this.gtrans = this.storage.trans.g
      this.ctrans = this.storage.trans.common
      this.ltrans = this.storage.trans.legal
    });
  },
  computed: {
       getDescription: function() { return "Lobbyland - Legals informations of the website."},
  },
  metaInfo () {
    return {
      title: this.getDescription,
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
}
</script>

<style>

</style>
