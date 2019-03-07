export const state = () => ({
  dirFiles: [],
  currentPath: '',
});

export const getters = {
  breadcrumb: state => {
    const breadcrumb = [
      {
        path: '/',
        name: '',
      },
      {
        path: '/home/',
        name: 'home',
      },
    ];
    if (state.currentPath !== '') {
      let path = '/home';
      for (const name of state.currentPath.split('/')) {
        path += `/${name}`;
        breadcrumb.push({
          name,
          path,
        });
      }
    }

    return breadcrumb;
  },
};

export const mutations = {
  setDirFiles(state, files = []) {
    state.dirFiles = files;
  },
  setCurrentPath(state, path) {
    state.currentPath = path;
  },
};

export const actions = {
  async readDir({ commit }, path = '') {
    commit('setDirFiles', await this.$axios.$get('/dir/' + path));
    commit('setCurrentPath', path);
  },
};
