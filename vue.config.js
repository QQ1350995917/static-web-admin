'use strict'
const path = require('path')
const pkg = require('./package.json')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = pkg.name || 'vue-element-admin' // page title
const port = 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // [process.env.VUE_APP_BASE_API]: {
      //   target: `http://localhost:${port}/mock`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API]: ''
      //   },
      //   onProxyReq: function (proxyReq, req, res) {
      //     //实在不知道代理后的路径，可以在这里打印出出来看看
      //     console.log("原路径1：" + req.originalUrl, "代理路径1：" + req.path)
      //   }
      // },
      // '/api/**': {
      //   target: `http://localhost:${port}/mock`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/'
      //   },
      //   onProxyReq: function (proxyReq, req, res) {
      //     //实在不知道代理后的路径，可以在这里打印出出来看看
      //     console.log("原路径2：" + req.originalUrl, "代理路径2：" + req.path)
      //   }
      // },
      '/service': {
        target: `http://localhost:12020`,
        changeOrigin: true,
        pathRewrite: {
          '^/service': ''
        },
        onProxyReq: function (proxyReq, req, res) {
          //实在不知道代理后的路径，可以在这里打印出出来看看
          console.log("原路径：" + req.originalUrl, "代理路径：" + req.path)
        }
      },
      // '/*': {
      //   target: `http://localhost:12020`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/*': '/*'
      //   },
      //   onProxyReq: function (proxyReq, req, res) {
      //     //实在不知道代理后的路径，可以在这里打印出出来看看
      //     console.log('原路径：' + req.originalUrl, '代理路径：' + req.path)
      //   }
      // },
    },
    after(app) {
      require('@babel/register')
      const bodyParser = require('body-parser')

      // parse app.body
      // http://expressjs.com/en/4x/api.html#req.body
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({
        extended: true
      }))

      const { default: mocks } = require('./mock')
      for (const mock of mocks) {
        app[mock.type](mock.url, mock.response)
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]element-ui[\\/]/
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
