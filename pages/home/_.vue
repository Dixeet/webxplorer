<template>
  <section class="section">
    <breadcrumb :path="breadcrumb" />
    <dir-content-table :content="dirFiles" />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Breadcrumb from '~/components/Breadcrumb';
import DirContentTable from '~/components/DirContentTable';

export default {
  components: {
    Breadcrumb,
    DirContentTable,
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
