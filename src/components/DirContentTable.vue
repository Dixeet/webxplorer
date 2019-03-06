<template>
  <b-table
    class="dir-content"
    :data="content"
    striped
    hoverable
    :loading="isLoading"
    mobile-cards
    :default-sort="['name','asc']"
  >
    <template slot-scope="props">
      <b-table-column field="name" label="name" sortable>
        <dct-dir-entry v-if="props.row.isDirectory" :content="props.row" />
        <dct-file-entry v-else :content="props.row" />
      </b-table-column>
      <b-table-column field="mtimeMs" label="Last Modification" centered sortable numeric>
        {{ date(props.row.mtime) }}
      </b-table-column>
      <b-table-column field="mtimeMs" label="Size" centered sortable numeric>
        {{ filesize(props.row.size) }}
      </b-table-column>
      <b-table-column label="Actions" centered>
        <b-tooltip v-if="!props.row.isDirectory" label="Download">
          <a :href="props.row.directDownloadLink">
            <b-icon
              class="has-text-link"
              icon="download"
            />
          </a>
        </b-tooltip>
        <b-tooltip v-else-if="props.row.isZippable" label="Zip">
          <a :href="props.row.zipLink">
            <b-icon
              class="has-text-link"
              icon="file-archive"
            />
          </a>
        </b-tooltip>
        <b-tooltip v-else label="Directory empty : unzippable">
          <b-icon
            class="has-text-grey"
            icon="file-archive"
          />
        </b-tooltip>
      </b-table-column>
    </template>
    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon
              pack="far"
              icon="folder-open"
              size="is-large"
            />
          </p>
          <p>Nothing here.</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
import moment from 'moment';
import DctFileEntry from './DirContentTable/DctFileEntry';
import DctDirEntry from './DirContentTable/DctDirEntry';

export default {
  components: {
    DctFileEntry,
    DctDirEntry,
  },
  props: {
    content: { type: Array, default: () => [] },
    isLoading: { type: Boolean, default: false },
  },
  methods: {
    date: function(date) {
      return moment(date)
        .locale(this.$store.state.language)
        .format('lll');
    },
    filesize: function(bytes, si = true) {
      const unit = si ? 1000 : 1024;
      if (bytes < unit)
        return (bytes % 1 === 0 ? bytes : bytes.toFixed(2)) + 'B';
      const exp = parseInt(Math.log(bytes) / Math.log(unit));
      const pre = (si ? 'kMGTPE' : 'KMGTPE')[exp - 1] + (si ? '' : 'i') + 'B';
      const n = bytes / Math.pow(unit, exp);
      return (n % 1 === 0 ? n : n.toFixed(2)) + pre;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .dir-content /deep/ tr {
    background: #282f2f !important;
  }
}
</style>
