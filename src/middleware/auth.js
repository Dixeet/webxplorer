export default function({ store, redirect }) {
  if (store.state.config.authEnable) {
    redirect('/login');
  }
}
