<template>
  <section class="section">
    <h1 class="title is-1">
      Test
    </h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad animi aut autem
      consequuntur dolor enim et facilis, fugit illo illum nesciunt optio porro quibusdam quos
      ratione saepe suscipit?
    </p>
    <p>
      Nesciunt officiis quas qui quis ratione rerum. Adipisci blanditiis consequuntur, deserunt
      dolorum ducimus excepturi fugiat fugit iste itaque magni nemo numquam pariatur porro
      quibusdam reprehenderit rerum sunt. Earum, quisquam voluptate!
    </p>
    <p>
      Beatae cum eligendi eveniet fugit rerum? Aliquid exercitationem hic ratione sunt veniam,
      voluptatem! Architecto beatae corporis, cum debitis dolorem expedita fugiat itaque labore
      nobis quam quis rerum tempore. Fuga, totam?
    </p>
    <p>
      Autem consequatur cum deserunt dicta distinctio error eum iure magnam, molestiae nihil optio
      quaerat quod rem similique sint sit suscipit! Ducimus est eveniet fugiat laudantium nemo
      reiciendis tempora vel. Voluptas?
    </p>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('dir', ['dirFiles']),
  },

  async asyncData({ params, store }) {
    await store.dispatch('dir/readDir', params.pathMatch);
  },
};
</script>
