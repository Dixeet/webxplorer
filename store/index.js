export const state = () => ({
  config: {},
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
    if (req.config) {
      state.config = req.config;
    }
  },
  toggleBurger({ commit }) {
    commit('toggleBurger');
  },
};
