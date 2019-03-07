export const state = () => ({
  config: {
    server: {
      apiBaseUrl: '/api',
      auth: {
        enable: false,
        tokenExpires: 3600,
      },
    },
  },
  language: 'en',
  notification: { message: '', type: '' },
  navbarBurgerIsActive: false,
  isLogged: false,
  notifyWatchable: false,
  renewTimeout: null,
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
  notifyWatchable(state) {
    state.notifyWatchable = !state.notifyWatchable;
  },
  setRenewTimeout(state, renewTimeout) {
    state.renewTimeout = renewTimeout;
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
  async login({ commit, dispatch }, payload = { password: '', renew: false }) {
    const data = await this.$axios.$post('/auth/login', {
      password: payload.password,
    });
    if (data && data.token) {
      commit('isLogged');
    }
    dispatch('renew', { notInstant: true });
  },
  async renew({ commit, state, dispatch }, payload = { notInstant: false }) {
    const timer = Math.floor(
      (state.config.server.auth.tokenExpires * 1000 * 4) / 5,
    );
    if (state.renewTimeout) {
      clearTimeout(state.renewTimeout);
    }
    if (!payload.notInstant) {
      const data = await this.$axios.$get('/auth/renew', { progress: false });
      if (data && data.token && !state.isLogged) {
        commit('isLogged');
      }
    }
    const renewTimeout = setTimeout(() => {
      dispatch('renew');
    }, timer);
    commit('setRenewTimeout', renewTimeout);
  },
};
