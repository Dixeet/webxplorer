<template>
  <section class="section">
    <nav class="breadcrumb is-large" aria-label="breadcrumbs">
      <ul>
        <nuxt-link
          v-for="(part) in breadcrumb"
          :key="part.path"
          tag="li"
          :to="part.path"
        >
          <a>{{ part.name }}</a>
        </nuxt-link>
      </ul>
    </nav>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('dir', ['dirFiles']),
    ...mapGetters('dir', ['breadcrumb']),
  },

  async asyncData({ params, store }) {
    await store.dispatch('dir/readDir', params.pathMatch);
  },
};
</script>
