<template>
  <div id="lbl-map" class="bloc-map" :style="{width: mapWidth}">
  </div>
</template>

<script>

import Datamap from "datamaps";
import d3 from "d3";
import topojson from "topojson";

export default {
  name: "lbl-map",
  props: ["selected",
          "clientSize"],

  data() {
    return {
    };
  },
    watch: {
    'selected': function (value) {
      this.loadEuropeMap(value)
    }
  },
  mounted() {
    this.loadEuropeMap(this.selected)
  },
  computed: {
      mapWidth: function() {
         return this.clientSize.x > 500 && "500px" || this.clientSize.x - 25 + 'px'
      },
  },
  methods: {
    /** */
    isSelected: function(country) {
      return this.selected === country;
    },
    loadEuropeMap: function(selected) {
       
      if (selected) {
       
       document.getElementById("lbl-map").innerHTML= "" // Clear

        var zoom = new Datamap({
          element: document.getElementById("lbl-map"),
          scope: "world",
          // Zoom in on EUROPE
          setProjection: function(element) {
            var projection = d3.geo
              .equirectangular()
              .center([0, 52])
              .rotate([-12, 0])
              .scale(540)
              .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            var path = d3.geo.path().projection(projection);

            return { path: path, projection: projection };
          },
          fills: {
            defaultFill: "#BBB",
            sel: "rgb(255, 177, 16)",
            eu1: "rgb(70, 98, 220)",
            eu2: "#545498",
            ban: "#777",
            eu3: "rgb(115, 85, 236)"
          },
          data: {
            PRT: { fillKey: (this.isSelected("Portugal") && "sel") || "eu1" }, //21
            ESP: { fillKey: (this.isSelected("Spain") && "sel") || "eu2" }, //11
            FRA: { fillKey: (this.isSelected("France") && "sel") || "eu1" }, //1
            ITA: { fillKey: (this.isSelected("Italia") && "sel") || "eu2" }, //24
            BEL: { fillKey: (this.isSelected("Belgium") && "sel") || "eu2" }, //4
            AUT: { fillKey: (this.isSelected("Austria") && "sel") || "eu1" }, //2
            DEU: { fillKey: (this.isSelected("Germany") && "sel") || "eu2" }, //3
            DNK: { fillKey: (this.isSelected("Denmark") && "sel") || "eu1" }, //8
            CYP: { fillKey: (this.isSelected("Cyprus") && "sel") || "eu3" }, //6
            CZE: { fillKey: (this.isSelected("Czech Republic") && "sel") || "eu3" }, //7
            IRL: { fillKey: (this.isSelected("Ireland") && "sel") || "eu1" }, //9
            EST: { fillKey: (this.isSelected("Estonia") && "sel") || "eu1" }, //10
            HRV: { fillKey: (this.isSelected("Croatia") && "sel") || "eu2" }, //13
            HUN: { fillKey: (this.isSelected("Hungary") && "sel") || "eu3" }, //14
            LVA: { fillKey: (this.isSelected("Latvia") && "sel") || "eu2" }, //15
            LTU: { fillKey: (this.isSelected("Lithuania") && "sel") || "eu3" }, //16
            SVK: { fillKey: (this.isSelected("Slovakia") && "sel") || "eu2" }, //17
            LUX: { fillKey: (this.isSelected("Luxembourg") && "sel") || "eu3" }, //18
            MLT: { fillKey: (this.isSelected("Malta") && "sel") || "eu3" }, //19
            POL: { fillKey: (this.isSelected("Poland") && "sel") || "eu1" }, //20
            SVN: { fillKey: (this.isSelected("Slovenia") && "sel") || "eu3" }, //23
            NLD: { fillKey: (this.isSelected("Netherlands") && "sel") || "eu1" }, //25
            FIN: { fillKey: (this.isSelected("Finland") && "sel") || "eu1" }, //26
            SWE: { fillKey: (this.isSelected("Sweden") && "sel") || "eu3" }, //27
            ROU: { fillKey: (this.isSelected("Romania") && "sel") || "eu1" }, //22
            GRC: { fillKey: (this.isSelected("Greece") && "sel") || "eu1" }, //12
            BGR: { fillKey: (this.isSelected("Bulgaria") && "sel") || "eu2" }, //5

            GBR: { fillKey: (this.isSelected("United Kingdom") && "sel") || "ban" } //27
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

<style lang="scss" scoped>

#lbl-map {
  height:330px; margin:auto;
}
</style>
