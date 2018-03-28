<template>
<div>
  <div id="lbl-map-activities" class="bloc-map" :style="{width: mapWidth}">
  </div>
  <div class="text-center">
    <h4>Most active countries in {{title}}</h4>

    <b-button-group class="text-center">
      <b-button v-on:click="zoomMap = 'eu'" :variant="zoomMap == 'eu' && 'dark' || 'default'">
        Europe
      </b-button>
      <b-button v-on:click="zoomMap = 'world'" :variant="zoomMap === 'world' && 'dark' || 'default'">
        World
      </b-button>
    </b-button-group>
    <br/>
    <br/>
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
          "clientSize"],

  data() {
    return {
      zoomMap: "world"
    };
  },
    watch: {
    'selected': function (value) {
      this.loadEuropeMap(value)
    },
    'zoomMap': function (value) {
      this.loadEuropeMap(value)
    }
  },
  mounted() {
    this.loadEuropeMap(this.selected)
  },
  computed: {
      /** */
      sortedCountries: function()  {
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
      var c=0;
      var countryFiltered = this.sortedCountries.filter(x => x[0] === country)[0]

      if (countryFiltered) {
        return "top" + (countryFiltered.cpt + 1)
      }

      return "na"
    },

    /** */
    loadEuropeMap: function(selected) {
       
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
            top1: "rgb(255, 10, 10)",
            top2: "rgb(240, 10, 10)",
            top3: "rgb(225, 10, 10)",
            top4: "rgb(210, 10, 10)",
            top5: "rgb(195, 10, 10)",
            top6: "rgb(170, 10, 10)",
            top8: "rgb(150, 10, 10)",
            top9: "rgb(130, 10, 10)",
            top10:"rgb(90, 10, 10)",
            ras: "rgb(0, 10, 10)"
          },
          data: {
            BEL: { fillKey: this.getColor('Belgium') }, //4

            PRT: { fillKey: this.getColor("Portugal") }, //21
            ESP: { fillKey: this.getColor("Spain") }, //11
            FRA: { fillKey: this.getColor("France") }, //1
            ITA: { fillKey: this.getColor("Italia") }, //24
            
            AUT: { fillKey: this.getColor("Austria") }, //2
            DEU: { fillKey: this.getColor("Germany") }, //3
            DNK: { fillKey: this.getColor("Denmark") }, //8
            CYP: { fillKey: this.getColor("Cyprus") }, //6
            CZE: { fillKey: this.getColor("Czech Republic") }, //7
            IRL: { fillKey: this.getColor("Ireland") }, //9
            EST: { fillKey: this.getColor("Estonia") }, //10
            HRV: { fillKey: this.getColor("Croatia") }, //13
            HUN: { fillKey: this.getColor("Hungary") }, //14
            LVA: { fillKey: this.getColor("Latvia") }, //15
            LTU: { fillKey: this.getColor("Lithuania") }, //16
            SVK: { fillKey: this.getColor("Slovakia") }, //17
            LUX: { fillKey: this.getColor("Luxembourg") }, //18
            MLT: { fillKey: this.getColor("Malta") }, //19
            POL: { fillKey: this.getColor("Poland") }, //20
            SVN: { fillKey: this.getColor("Slovenia") }, //23
            NLD: { fillKey: this.getColor("Netherlands") }, //25
            FIN: { fillKey: this.getColor("Finland") }, //26
            SWE: { fillKey: this.getColor("Sweden") }, //27
            ROU: { fillKey: this.getColor("Romania") }, //22
            GRC: { fillKey: this.getColor("Greece") }, //12
            BGR: { fillKey: this.getColor("Bulgaria") }, //5

            GBR: { fillKey: this.getColor("United Kingdom")}, //27
  
            CHE: { fillKey: this.getColor("Switzerland")}, //27
            CAN: { fillKey: this.getColor("Canada") }, //24
            USA: { fillKey: this.getColor("United states") } //24
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

</style>
