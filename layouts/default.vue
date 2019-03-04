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
          <div class="navbar-start">
            <nuxt-link class="navbar-item" to="/home/">
              Home
            </nuxt-link>
            <nuxt-link class="navbar-item" to="/home/normal">
              Good
            </nuxt-link>
            <nuxt-link class="navbar-item" to="/home/tata/titi">
              Wrong
            </nuxt-link>
            <nuxt-link class="navbar-item" to="/login">
              Login
            </nuxt-link>
          </div>
        
          <div class="navbar-end">
            <div class="navbar-item" />
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
export default {
  data: () => ({
    isMounted: false,
  }),

  computed: {
    notification() {
      return this.$store.state.notification;
    },
  },

  watch: {
    notification: function(notify) {
      this.notify(notify);
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
      }
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
