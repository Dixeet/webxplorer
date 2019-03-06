<template>
  <nav class="breadcrumb is-large" aria-label="breadcrumbs">
    <ul>
      <nuxt-link
        v-for="(part) in path"
        :key="part.path"
        tag="li"
        :to="part.path"
      >
        <a>{{ part.name }}</a>
      </nuxt-link>
    </ul>
  </nav>
</template>

<script>
export default {
  props: { path: { type: Array, default: () => [] } },
};
</script>
