const pkg = require('./package');

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  srcDir: 'src/',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//use.fontawesome.com/releases/v5.7.2/css/all.css',
      },
    ],
  },

  router: {
    middleware: 'auth',
    linkExactActiveClass: 'is-active',
    // base: '/webxplorer/dist/',
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['@assets/css/theme/index.scss'],

  /*
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/buefy.js',
    '~plugins/axios-error.js',
    { src: '~plugins/onFrontLoad.client.js', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: '/api',
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            // fix: true
          },
        });
      }
      if (ctx.isDev) {
        config.devtool = 'cheap-module-eval-source-map';
      }
    },
  },
};
