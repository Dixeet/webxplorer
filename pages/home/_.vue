<template>
  <div>
    <h1>Test</h1>
    <div>
      <nuxt-link to="/home">
        Go to /home error
      </nuxt-link>
    </div>
    <div>
      <nuxt-link to="/home/tata/titi">
        Go to /home/tata/titi
      </nuxt-link>
    </div>
    <div>
      <nuxt-link to="/home/">
        Go to /home/
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ params }) {}
};
</script>
