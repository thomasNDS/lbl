<template>
  <div>

    <div class="lbl-page-header" style="">
      <div class="container text-center" style="padding:1em;">
        <h1 class="display-3">Contact</h1>
      </div>
      <!-- End container -->
    </div>
    <!-- End jumbotron -->

    <div class="container">

      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <b-form-group :label="ltrans.yourDemand + ' :'">
          <b-form-radio-group id="radios2" v-model="form.selected" name="radioSubComponent">
            <b-form-radio value="info">{{ltrans.needInfo}}</b-form-radio>
            <b-form-radio value="signal">{{ltrans.reportBug}}</b-form-radio>
            <b-form-radio value="others">{{ltrans.otherDemand}}</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-textarea id="textarea1"
                        v-model="form.text"
                        :placeholder="ltrans.howCanIHelp"
                        :rows="5"
                        :max-rows="6">
        </b-form-textarea>

        <b-form-group id="exampleInputGroup1"
                      :label="ltrans.emailAddress + ' :'"
                      label-for="exampleInput1"
                      :description="ltrans.neverShareMail">
          <b-form-input id="exampleInput1"
                        type="email"
                        v-model="form.email"
                        required
                        :placeholder="ltrans.enterEmail">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                      :label="ltrans.yourName + ' :'"
                      label-for="exampleInput2">
          <b-form-input id="exampleInput2"
                        type="text"
                        v-model="form.name"
                        required
                        :placeholder="ltrans.enterName">
          </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">{{ctrans.submit}}</b-button>
        <b-button type="reset" variant="danger">{{ctrans.reset}}</b-button>
      </b-form>

    </div>

    <!-- Modal -->
     <b-modal :no-close-on-backdrop="true" :no-close-on-esc="true" :cancel-disabled="true"
               ref="myModalRef" hide-footer :title="ltrans.contactDemand">
      <!-- loading -->
      <div v-if="sendState == 0">               
        <div class="d-block text-center">          
          <h4> <i class="fas fa-circle-notch fa-spin"></i> {{ltrans.sending}} ...
          </h4>
        </div>
      </div>
      <!-- OK -->
      <div v-else-if="sendState == 1">               
        <div class="d-block text-center"> 
          
          <h4> <i class="far fa-envelope"></i> {{ltrans.isSend}}<!--C'est envoyé-->.</h4>
          <p>{{ltrans.thanksContact}}<!--Merci de nous avoir contactés. Nous ..-->.</p>
        </div>
      </div>
      <!-- Error -->
      <div v-else>               
        <div class="d-block text-center"> 
          
          <h4> <i class="fa fa-exclamation-triangle"></i> {{ctrans.notAvailable}}<!--Oups..! Le service est momentanément indisponible.-->
          </h4>
          <p>{{ctrans.apologize}}<!--  We apologize for any inconvenience this has caused --></p>
        </div>
      </div>
      <b-btn class="mt-3" variant="outline-primary" block v-if="sendState != 0"
             :href="'#/?lang=' + storage.lang">{{ctrans.backHome}}</b-btn>

    </b-modal>

  </div>
</template>

<script>
import bus from '../components/EventBus.js'

export default {
  name: 'contact',
  props: ['storage'],

  data() {
    return {
      form: {
        email: '',
        name: '',
        text : '',
        selected: 'info'
      },
      sendState : 0, // 0: loading; 1: send; 2: send error
      show: true,
      ctrans: this.storage.trans && this.storage.trans.common || [],
      ltrans: this.storage.trans && this.storage.trans.contact || []
    }
  },
  created() {
    bus.$on('updateLang', section => {
      this.ctrans = this.storage.trans.common
      this.ltrans = this.storage.trans.contact
    });
  },
    methods: {

      onSubmit (evt) {
        evt.preventDefault()
        this.$refs.myModalRef.show()
        this.sendContact(this.form)
      },
      
      onReset (evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.email = ''
        this.form.name = ''
        this.form.text = ''
        this.selected = 'first'
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => { this.show = true });
      },
      /** */
      sendContact: function(form) {
        let url = this.storage.url + "&method=contact&context=" + form.selected + "&mail=" 
        + form.email + "&name=" + form.name + "&text=" + form.text
        this.$http.get(url).then(
          response => {
            this.sendState = 1
          },
          response => {
            console.error("fail send")
            this.sendState = 2
          }
        );
      },
  },
  computed: {
       getDescription: function() { return "Lobbyland - Contact"},
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

<style lang="scss" scoped>

</style>
