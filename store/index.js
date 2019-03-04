export const state = () => ({
  config: {},
  notification: { message: '', type: '' },
});

export const mutations = {
  notify(
    state,
    notification = {
      message: '',
      type: '',
    },
  ) {
    state.notification = notification;
  },
};

export const actions = {
  nuxtServerInit({ state }, { req }) {
    if (req.config) {
      state.config = req.config;
    }
  },
};
