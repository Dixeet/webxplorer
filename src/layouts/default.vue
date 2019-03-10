<template>
  <div>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item is-size-5 has-text-weight-bold brand-link" to="/home/">
            Webxplorer
          </nuxt-link>
        
          <a
            role="button"
            :class="{ 'is-active': $store.state.navbarBurgerIsActive}"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            @click="$store.dispatch('toggleBurger')"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': $store.state.navbarBurgerIsActive}">
          <div class="navbar-start" />
        
          <div class="navbar-end">
            <nuxt-link
              v-if="isLogged || !$store.state.config.server.auth.enable"
              class="navbar-item"
              to="/configuration"
            >
              <b-tooltip position="is-bottom" label="Configuration">
                <b-icon
                  icon="cog"
                />
              </b-tooltip>
            </nuxt-link>
            <nuxt-link v-if="!isLogged" class="navbar-item" to="/login">
              <b-tooltip position="is-bottom" label="Login">
                <b-icon
                  icon="sign-in-alt"
                />
              </b-tooltip>
            </nuxt-link>
            <a v-else class="navbar-item" @click.stop="logout">
              <b-tooltip position="is-bottom" label="Logout">
                <b-icon
                  icon="sign-out-alt"
                />
              </b-tooltip>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  data: () => ({
    isMounted: false,
  }),

  computed: {
    notification() {
      return this.$store.state.notification;
    },
    notifyWatchable() {
      return this.$store.state.notifyWatchable;
    },
    isLogged() {
      return this.$store.state.isLogged;
    },
  },

  watch: {
    notifyWatchable: function() {
      this.notify(this.notification);
    },
    isMounted: function(isMounted) {
      if (isMounted && this.notification.message) {
        this.notify(this.notification);
      }
    },
  },

  mounted() {
    this.isMounted = true;
  },

  methods: {
    notify: function(notif) {
      if (this.isMounted) {
        this.$toast.open({ message: notif.message, type: notif.type });
        this.$store.commit('notify', {
          message: '',
          type: '',
        });
      }
    },
    logout: function() {
      Cookies.remove('jwt-token');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~assets/css/theme/_variables.scss';
.brand-link.is-active {
  color: $text-strong;
}
</style>
