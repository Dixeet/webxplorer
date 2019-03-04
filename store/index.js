export const state = () => ({
  config: {}
});

export const actions = {
  nuxtServerInit({ state }, { req }) {
    if (req.config) {
      state.config = req.config;
    }
  }
};
