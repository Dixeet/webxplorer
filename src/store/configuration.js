import Dot from 'dot-object';

const dot = new Dot(':');

export const state = () => ({
  config: {
    'server:auth:password': '',
  },
});

export const mutations = {
  setConfig(state, config = {}) {
    state.config = Object.assign(state.config, config);
  },
};

export const actions = {
  async getConfig({ commit }) {
    const config = await this.$axios.$get('/config');
    commit('setConfig', dot.dot(config));
  },
  async pushConfig({ commit }, config) {
    const obj = dot.object(config);
    const conf = await this.$axios.$post('/config', obj);
    commit('setConfig', dot.dot(conf));
  },
};
