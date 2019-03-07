export default function({ $axios, store, redirect, app }) {
  const errorHandlingActions = [
    {
      url: '/auth',
      status: 401,
      action: 'dispatch',
      actionValue: 'notify',
      args: {
        message: 'Wrong password',
        type: 'is-danger',
      },
    },
    {
      url: '/dir',
      status: 404,
      action: 'dispatch',
      actionValue: 'notify',
      args: {
        message: 'Path not found',
        type: 'is-danger',
      },
    },
    {
      url: '/dir',
      status: 404,
      action: 'redirect',
      args: '/home/',
    },
  ];

  function handleError(request) {
    let errorHasBeenHandle = false;
    for (const handler of errorHandlingActions) {
      const url = process.client ? request.responseURL : request.path;
      const status = process.client ? request.status : request.res.statusCode;
      if (url.indexOf(handler.url) > -1) {
        if (!handler.status || handler.status === status) {
          switch (handler.action) {
            case 'commit':
              store.commit(handler.actionValue, handler.args);
              break;
            case 'dispatch':
              store.dispatch(handler.actionValue, handler.args);
              break;
            case 'redirect':
              if (process.client) {
                setImmediate(() => {
                  app.router.push(handler.args);
                });
              } else {
                redirect(handler.args);
              }
              break;
          }
          errorHasBeenHandle = true;
        }
      }
    }
    return errorHasBeenHandle;
  }

  $axios.onError(error => {
    const errorHasBeenHandle = handleError(error.request);
    if (!errorHasBeenHandle) {
      store.dispatch('notify', { message: error.message, type: 'is-danger' });
    }
    throw error;
  });
}
