import Cookie from 'js-cookie';

export default function({ store, redirect, route, query }) {
  if (store.state.config.server.auth.enable) {
    if (process.server && !store.state.isLogged) {
      if (route.path !== '/login') {
        redirect('/login', { redirect: 'authenticate' });
      }
      if (query.redirect && query.redirect === 'authenticate') {
        store.dispatch('notify', {
          message: 'You need to be authenticate',
          type: 'is-danger',
        });
      }
    }
    if (process.client && (!Cookie.get('jwt-token') || !store.state.isLogged)) {
      if (store.state.isLogged) {
        store.commit('isNotLogged');
      }
      if (route.path !== '/login') {
        store.dispatch('notify', {
          message: 'You need to be authenticate',
          type: 'is-danger',
        });
        redirect('/login');
      }
    }
  }
}
