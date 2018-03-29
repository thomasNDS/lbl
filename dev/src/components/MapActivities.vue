<template>
<div>
  <div id="lbl-map-activities" class="bloc-map" :style="{width: mapWidth}">
  </div>
  <div class="text-center">
    <h4>{{ctrans.mostActives}}<!-- Most actives countries in--></h4>

    <b-button-group class="text-center">
      <b-button v-on:click="zoomMap = 'eu'" :variant="zoomMap == 'eu' && 'dark' || 'default'">
        Europe
      </b-button>
      <b-button v-on:click="zoomMap = 'world'" :variant="zoomMap === 'world' && 'dark' || 'default'">
        {{ctrans.world}}
      </b-button>
    </b-button-group>
    <br/>
    <br/>
  </div>

<div class="progress">
  <div class="progress-bar lbl-progress-block" role="progressbar" style="background: #BBB;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{ctrans.fewActivity}}</div>
  <div class="progress-bar lbl-progress-block" role="progressbar" style="background: rgb(110, 90, 90);" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  <div class="progress-bar lbl-progress-block" role="progressbar" style="background: rgb(170, 90, 90);" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  <div class="progress-bar lbl-progress-block" role="progressbar" style="background: rgb(205, 90, 90);" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  <div class="progress-bar lbl-progress-block" role="progressbar" style="background: rgb(255, 90, 90);" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{ctrans.highActivity}}</div>
</div>

</div>
</template>

<script>

import Datamap from "datamaps";
import d3 from "d3";
import topojson from "topojson";

export default {
  name: "lbl-map-activities",
  props: ["selected", 
          "title",
          "clientSize",
          "ctrans"],

  data() {
    return {
      zoomMap: "world"
    };
  },
    watch: {
    'selected': function (evt) {
      this.loadMap(evt)
    },
    'zoomMap': function (evt) {
      this.loadMap(evt)
    }
  },
  mounted() {
    this.loadMap(this.selected)
  },
  computed: {
      /** */
      sortedCountries: function()  {
        if (!this.selected) return "load"
        var c=0;
        return this.selected.map(x => {x.cpt=c++; return x})
      },
      /** */
      mapWidth: function() {
         return this.clientSize.x > 800 && "950px" || this.clientSize.x - 35 + 'px'
      }
  },
  methods: {
    /** */
    isSelected: function(country) {
      return this.selected === country;
    },
    /** */
    getColor: function(country) {
      var c=0, res = "na"
      var countryFiltered = this.sortedCountries.filter(x => x[0] === country)[0]

      if (countryFiltered) {
        res = "top" + (countryFiltered.cpt + 1)
      }
      // console.log("country =" + country + "- " + res)
      return res
    },

    /** */
    loadMap: function(selected) {
       
      if (selected) {
       //console.log(selected)

       document.getElementById("lbl-map-activities").innerHTML= "" // Clear
        var zoomSize = this.zoomMap === "eu" && 540 || 100
        var zoomCenter = this.zoomMap === "eu" && [0, 50] || [0, -10]

        var zoom = new Datamap({
          element: document.getElementById("lbl-map-activities"),
          scope: "world",
          // Zoom in on EUROPE
          setProjection: function(element) {
            var projection = d3.geo
              .equirectangular()
              .center(zoomCenter)
              .rotate([-12, 0])
              .scale(zoomSize)
              .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            var path = d3.geo.path().projection(projection);

            return { path: path, projection: projection };
          },
          fills: {
            defaultFill: "#BBB",
            top1: "rgb(255, 90, 90)",
            top2: "rgb(240, 90, 90)",
            top3: "rgb(225, 90, 90)",
            top4: "rgb(210, 90, 90)",
            top5: "rgb(195, 90, 90)",
            top6: "rgb(170, 90, 90)",
            top8: "rgb(150, 90, 90)",
            top9: "rgb(130, 90, 90)",
            top10:"rgb(110, 90, 90)",
            ras: "rgb(0, 10, 10)"
          },
          data: {
            BEL: { fillKey: this.getColor('belgium') }, //4

            PRT: { fillKey: this.getColor("portugal") }, //21
            ESP: { fillKey: this.getColor("dpain") }, //11
            FRA: { fillKey: this.getColor("france") }, //1
            ITA: { fillKey: this.getColor("italia") }, //24
            
            AUT: { fillKey: this.getColor("austria") }, //2
            DEU: { fillKey: this.getColor("germany") }, //3
            DNK: { fillKey: this.getColor("denmark") }, //8
            CYP: { fillKey: this.getColor("cyprus") }, //6
            CZE: { fillKey: this.getColor("czech Republic") }, //7
            IRL: { fillKey: this.getColor("ireland") }, //9
            EST: { fillKey: this.getColor("estonia") }, //10
            HRV: { fillKey: this.getColor("croatia") }, //13
            HUN: { fillKey: this.getColor("hungary") }, //14
            LVA: { fillKey: this.getColor("latvia") }, //15
            LTU: { fillKey: this.getColor("lithuania") }, //16
            SVK: { fillKey: this.getColor("slovakia") }, //17
            LUX: { fillKey: this.getColor("luxembourg") }, //18
            MLT: { fillKey: this.getColor("malta") }, //19
            POL: { fillKey: this.getColor("poland") }, //20
            SVN: { fillKey: this.getColor("slovenia") }, //23
            NLD: { fillKey: this.getColor("netherlands") }, //25
            FIN: { fillKey: this.getColor("finland") }, //26
            SWE: { fillKey: this.getColor("sweden") }, //27
            ROU: { fillKey: this.getColor("romania") }, //22
            GRC: { fillKey: this.getColor("greece") }, //12
            BGR: { fillKey: this.getColor("bulgaria") }, //5

            GBR: { fillKey: this.getColor("united kingdom")}, //27
  
            CHE: { fillKey: this.getColor("switzerland")}, //27
            CAN: { fillKey: this.getColor("canada") }, //24
            USA: { fillKey: this.getColor("united states") } //24
          },
          geographyConfig: {
            highlightFillColor: "#C51162",
          }
        }); // end map
      }
    } // end loadEurope

  } // end methods
};
</script>

<style lang="css" scoped>

  #lbl-map-activities{
    min-height:400px;
    margin:auto;
  }
  .lbl-progress-block {
    width: 25%;
  }
</style>
