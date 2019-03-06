<template>
  <span class="link has-text-weight-bold">
    <b-icon
      pack="far"
      icon="folder"
    />
    <nuxt-link :to="content.link">&nbsp;{{ content.name }}/</nuxt-link>
  </span>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => ({
        encodedPath: '',
        fullPath: '',
        isDirectory: false,
        mtime: '',
        mtimeMs: 0,
        name: '',
        path: '',
        size: 0,
        link: '',
        zipLink: '',
        directDownloadLink: '',
      }),
    },
  },
};
</script>

<style scoped>
.link a,
.link {
  color: #f1b70e;
}
</style>
