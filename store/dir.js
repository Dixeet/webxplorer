export const state = () => ({
  dirFiles: [],
});

export const mutations = {
  setDirFiles(state, files = []) {
    state.dirFiles = files;
  },
};

export const actions = {
  async readDir({ commit }, path = '') {
    try {
      commit('setDirFiles', await this.$axios.$get('/dir/' + path));
    } catch (e) {
      commit(
        'notify',
        { message: e.message, type: 'is-danger' },
        { root: true },
      );
    }
  },
};
