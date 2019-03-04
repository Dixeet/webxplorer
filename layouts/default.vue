<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  data: () => ({
    isMounted: false,
  }),

  computed: {
    notification() {
      return this.$store.state.notification;
    },
  },

  watch: {
    notification: function(notify) {
      this.notify(notify);
    },
    isMounted: function(isMounted) {
      if (isMounted && this.notification.message) {
        this.notify(this.notification);
      }
    },
  },

  mounted() {
    this.isMounted = true;
  },

  methods: {
    notify: function(notif) {
      if (this.isMounted) {
        this.$toast.open({ message: notif.message, type: notif.type });
      }
    },
  },
};
</script>
