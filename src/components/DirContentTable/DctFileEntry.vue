<template>
  <span class="link has-text-weight-bold">
    <b-icon
      pack="far"
      icon="file"
    />
    <a :href="content.link">&nbsp;{{ content.name }}</a>
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
      }),
    },
  },
};
</script>

<style scoped >
.link a,
.link {
  color: #dbdbdb;
}
</style>
