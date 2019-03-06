export const state = () => ({
  config: {},
  language: 'en',
  notification: { message: '', type: '' },
  navbarBurgerIsActive: false,
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
  toggleBurger(state) {
    state.navbarBurgerIsActive = !state.navbarBurgerIsActive;
  },
};

export const actions = {
  nuxtServerInit({ state }, { req }) {
    if (req && req.config) {
      state.config = req.config;
    }
    if (req && req.headers && req.headers['accept-language']) {
      state.language = req.headers['accept-language'];
    }
  },
  toggleBurger({ commit }) {
    commit('toggleBurger');
  },
};
