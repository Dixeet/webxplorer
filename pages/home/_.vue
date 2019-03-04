<template>
  <section class="section">
    <breadcrumb :path="breadcrumb" />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import breadcrumb from '~/components/breadcrumb';

export default {
  components: {
    breadcrumb,
  },

  computed: {
    ...mapState('dir', ['dirFiles']),
    ...mapGetters('dir', ['breadcrumb']),
  },

  async asyncData({ params, store }) {
    await store.dispatch('dir/readDir', params.pathMatch);
  },
};
</script>
