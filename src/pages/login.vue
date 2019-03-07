<template>
  <section class="section">
    <div class="columns is-centered is-mobile">
      <div class="column is-narrow">
        <form @submit.prevent="login">
          <b-field label="Login">
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
    login: async function() {
      try {
        await this.$store.dispatch('login', { password: this.password });
        this.$router.push('/home/');
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
</style>
