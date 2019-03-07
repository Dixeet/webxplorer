<template>
  <section class="section">
    <div class="columns is-centered is-mobile">
      <div class="column form">
        <h1 class="is-size-2">
          Configuration
        </h1>
        <form @submit.prevent="pushConfig">
          <b-field label="Password">
            <b-input
              v-model="config['server:auth:password']"
              type="password"
              placeholder="Password"
              password-reveal
            />
          </b-field>
          <hr class="divider">
          <b-field label="Api base Url">
            <b-input v-model="config['server:apiBaseUrl']" placeholder="server.apiBaseUrl" />
          </b-field>
          <b-field label="Root directory to explore from">
            <b-input v-model="config['server:rootDir']" placeholder="server.rootDir" />
          </b-field>
          <hr class="divider">
          <b-field label="Turn on authentication (Highly recommended)">
            <b-switch v-model="config['server:auth:enable']" type="is-success">
              Authentication enable
            </b-switch>
          </b-field>
          <b-field label="Secret key to sign JWT token">
            <b-input
              v-model="config['server:auth:jwt-secret']"
              type="password"
              placeholder="server.auth.jwt-token"
              password-reveal
            />
          </b-field>
          <b-field label="Token expires in (seconds)">
            <b-input
              v-model="config['server:auth:tokenExpires']"
              placeholder="server.auth.tokenExpires"
              type="number"
              min="60"
            />
          </b-field>
          <b-field>
            <button class="button is-primary" type="submit">
              Send
            </button>
          </b-field>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('configuration', {
      config: state => Object.assign({}, state.config),
    }),
  },

  async asyncData({ params, store }) {
    await store.dispatch('configuration/getConfig');
  },

  methods: {
    pushConfig() {
      const config = {};
      for (const key of Object.keys(this.config)) {
        if (this.config[key] !== this.$store.state.configuration.config[key]) {
          config[key] =
            key === 'server:auth:tokenExpires'
              ? parseInt(this.config[key], 10)
              : this.config[key];
        }
      }
      this.$store.dispatch('configuration/pushConfig', config);
    },
  },
};
</script>

<style scoped>
.form {
  max-width: 400px;
}
h1 {
  margin-bottom: 25px;
}
</style>
