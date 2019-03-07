import Cookie from 'js-cookie';

export default function({ store }) {
  if (process.client) {
    if (Cookie.get('jwt-token')) {
      store.dispatch('renew');
    }
  }
}
