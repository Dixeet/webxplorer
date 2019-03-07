<template>
  <section class="section">
    <div class="columns is-centered is-mobile">
      <div class="column is-narrow">
        <form @submit.prevent="login">
          <b-field>
            <b-input
              v-model="password"
              type="password"
              placeholder="Password"
              password-reveal
            />
            <p class="control">
              <button class="button is-primary" type="submit">
                Login
              </button>
            </p>
          </b-field>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    password: '',
  }),
  methods: {
    login: function() {
      this.$store.dispatch('login', { password: this.password });
    },
  },
};
</script>

<style scoped>
</style>
