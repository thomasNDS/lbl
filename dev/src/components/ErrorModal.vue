<template>
    <div  class="">

     <b-modal :no-close-on-backdrop="true" :no-close-on-esc="true" :cancel-disabled="true"
               ref="myModalRef" hide-footer title="Ooops !">
      <div class="d-block text-center">
        <h4> <i class="fa fa-exclamation-triangle"></i> {{trans[175]}}<!--  this organization is not referenced -->.
        </h4>
        <p>{{trans[176]}}<!--  We apologize for any inconvenience this has caused -->.</p>
      </div>

      <b-btn class="mt-3" variant="outline-primary" block
       :href="'#/?lang=' + storage.lang">{{trans[177]}} <!--Retour Accueil-->{{id}}</b-btn>

    </b-modal>

    </div>

</template>

<script>
import bus from "./EventBus.js";

export default {
  name: "error-modal",
  props: ["storage", "id"],

  data() {
    return {
      trans: []
    };
  },
  mounted() {

    if (this.storage.trans != null) {
        this.trans = this.storage.trans.g
    }

    bus.$on("updateLang", section => {
      this.trans = this.storage.trans.g
    });
  },
  methods: {
    show: function(date) {
      this.$refs.myModalRef.show()
      this.notifyError("|| id=" + this.id + " || Fail page = " + window.location.href)
    },
    /** */
    notifyError: function(txt) {
      console.log(this.storage.url + "&method=deadPage&context=modal&" + txt)
      this.$http.get(this.storage.url + "&method=deadPage&context=modal&" + txt).then(
        response => {
           //console.log("error notify");
         },
        response => {
          console.error("error notify");
        }
      );
    },

  }, // end methods
   computed: {
    transLoaded: function() {
      return this.trans.length > 0;
    }
   }
};
</script>

<style lang="scss" scoped>

.lbl-interet {
    margin: 0.3em;
    line-height: 2em;
}
.lbl-interets {
   line-height: 4em;
}

</style>
