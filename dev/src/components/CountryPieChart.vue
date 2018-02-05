<template>
  <vue-chartist :data="data" :options="options" type="Pie"></vue-chartist>
</template>

<script>
import VueChartist from 'v-chartist';

export default {
  name: "pie-chart",
  props: ["datachart"],
  components: {
      'vue-chartist': VueChartist
  },

 data: function () {
        return {

            options: {
                fullWidth: true,
                donut: true,
                donutWidth: 250,
                donutSolid: true,
                startAngle: 270,
                showLabel: true,
            }
        };
    },
    computed: {
      /** */
      data: function() {
        var res = {labels : [], series : []}
        
        this.datachart.forEach(function(input) { 

          res.labels.push(input.t)
          res.series.push(input.value)
        })
        return res
      },

    }
}


</script>

<style lang="scss" scoped>

.ct-series-a {
  fill : #f8bbd0
}
.ct-series-b {
  fill : #b2dfdb
}
.ct-series-c {
  fill : #f0f4c3
}
.ct-series-d {
  fill : #ffe0b2
}
.ct-series-e {
  fill : #d7ccc8
}
.ct-series-f {
  fill : #cfd8dc
}
.ct-series-g {
  fill : #b3e5fc
}
.ct-series-h {
  fill : #dcedc8
}
.ct-series-i {
  fill : #e1bee7
}
.ct-series-j {
  fill : #c5cae9
}
.ct-series-k {
  fill : #ffecb3
}
</style>