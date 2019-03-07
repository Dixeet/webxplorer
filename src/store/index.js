export const state = () => ({
  config: {
    server: {
      apiBaseUrl: '/api',
      auth: {
        enable: false,
      },
    },
  },
  ssrActions: [],
  language: 'en',
  notification: { message: '', type: '' },
  navbarBurgerIsActive: false,
  isLogged: false,
  notifyWatchable: false,
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
  isLogged(state) {
    state.isLogged = true;
  },
  isNotLogged(state) {
    state.isLogged = false;
  },
  setSsrActions(state, actions = []) {
    state.ssrActions = actions;
  },
  notifyWatchable(state) {
    state.notifyWatchable = !state.notifyWatchable;
  },
};

export const actions = {
  nuxtServerInit({ state, commit }, { req }) {
    if (req) {
      if (req.config) {
        state.config = req.config;
      }
      if (req.headers && req.headers['accept-language']) {
        state.language = req.headers['accept-language'];
      }
      if (req.isLogged) {
        state.isLogged = req.isLogged;
      }
    }
  },
  toggleBurger({ commit }) {
    commit('toggleBurger');
  },
  notify({ commit }, notification) {
    commit('notify', notification);
    commit('notifyWatchable');
  },
  async login({ commit, state }, payload = { password: '', renew: false }) {
    const data = await this.$axios.$post('/auth/login', {
      password: payload.password,
    });
    if (data && data.token) {
      commit('isLogged');
    }
  },
};
