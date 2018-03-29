<template>
    <div id="top">

        <link href="https://fonts.googleapis.com/css?family=Bangers" rel="stylesheet">

        <b-navbar class="navbar navbar-expand-lg navbar-light container" style="padding-top: 1em;">
          <!-- MOBILE COLLAPSE -->
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

          <!-- TITLE -->
          <b-navbar-brand class="navbar-brand title" v-bind:href="'#/?lang=' + storage.lang" style="font-size: 2.8em;">
          LobbyLand</b-navbar-brand>

          <b-collapse is-nav id="nav_collapse">
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

              <!-- SEARCH DROPDOWN -->
              <b-nav-form>
                <b-form-input id="searchInput" v-model="searchedText" :placeholder="gtrans[24]" v-on:input="changeSearch" right>
                </b-form-input>
              </b-nav-form>

              <b-popover target="searchInput" triggers="focus" placement="auto" ref="popover">
                  <template slot="">

                        <b-list-group id="example-1" v-if="results && results.length > 0">
                            <b-list-group-item v-for="res in results" style="border-left:none;border-right:none;" :key="res[0]">
                                <a v-bind:href="'#/orga/' + res[0] + '?lang=' + storage.lang">{{ res[1] }}</a>
                            </b-list-group-item>
                        </b-list-group>
                        
                        <span v-else> {{popoverDataContent}} </span>

                  </template>
              </b-popover>

              <!-- LANG DROPDOWN -->
              <b-nav-item-dropdown id="langDropdown" variant="outline-primary" class="" 
                    style="margin-left:1em;border-color: #cccdce;" right>
                  <span slot="button-content">
                      <img src="https://lobbyland.eu/static/fr.svg" class="flag" alt="FR" v-if="lang === 'FR'" />
                      <img src="https://lobbyland.eu/static/gb.svg" class="flag" alt="EN" v-else-if="lang === 'EN'" />
                  </span>

                  <b-dropdown-item aria-describedby="fr" v-on:click="updateLang('EN')"><img src="https://lobbyland.eu/static/gb.svg" class="flag" alt="English" /> English </b-dropdown-item>
                  <b-dropdown-item aria-describedby="en" v-on:click="updateLang('FR')"><img src="https://lobbyland.eu/static/fr.svg" class="flag" alt="Français" /> Français </b-dropdown-item>

              </b-nav-item-dropdown> <!-- End lang dropdown -->

            </b-navbar-nav>
          </b-collapse>
        </b-navbar>

    </div>
</template>

<script>
import bus from "../components/EventBus.js";

export default {
  props: ["storage"],
  name: "lbl-header",
  data() {
    return {
      gtrans: this.storage.trans && this.storage.trans.g || [],
      lang: this.storage.lang,
      results: [],
      searchedText: "",
      popoverDataContent: "Search an organization"
    };
  },
  mounted: function() {
    if (!this.storage.trans) {
      this.loadLang();
    }
  },
  methods: {
    /** */
    changeSearch: function(event) {
      if (this.searchedText.length > 2) {
        this.popoverDataContent = this.gtrans[100]; // "Loading ..."
        this.searchOrga(this.searchedText);
      } else {
        this.popoverDataContent = this.gtrans[99]; // "Search an organization"
      }
    },

    /** */
    searchOrga: function(txt) {
      this.$http.get(this.storage.url + "&method=searchOrga&q=" + txt).then(
        response => {
          this.results = response.body.data;
          if (this.results.length == 0) {
            this.popoverDataContent = this.gtrans[102]; //"No results found"
          }
        },
        response => {
          console.error("error " + status);
          this.popoverDataContent = this.gtrans[101]; // "La recherche ne fonctionne plus"
        }
      );
    },

    /** */
    updateLang: function(lang) {
      if (lang != this.storage.lang) {
        this.storage.lang = lang;
        this.loadLang();
      }
    },
    /** */
    loadLang: function() {
      this.$http
        .get(this.storage.ctxDist + "/static/lang/" + this.storage.lang.toLowerCase() + "/global.json")
        .then(
          response => {
            //console.log(response)
            this.storage.trans = response.body;
            this.gtrans = this.storage.trans.g;
            this.lang = this.storage.lang;

            this.popoverDataContent = this.gtrans[99];

            bus.$emit("updateLang");
          },
          response => {
            console.error("error " + status);
          }
        );
    },

  },
  computed: {

  },

  metaInfo () {
    return {link: [
      { rel: "alternate", href: window.location.href.split('?')[0] + '?lang=EN', hreflang: "en-GB" },
      { rel: "alternate", href: window.location.href.split('?')[0] + '?lang=FR', hreflang: "fr-FR" },
      { rel: "alternate", href: window.location.href.split('?')[0], hreflang: "x-default" }
    ]
    }
  }
};
</script>

<style>

.navbar-light .navbar-brand.title {
  font-family: 'Bangers', cursive;
  color: #C51162;
}

.navbar-light .navbar-brand.title:hover, .navbar-light .navbar-brand.title:focus {
  color: #F48FB1;
}
</style>
