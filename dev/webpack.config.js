var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'dist/',
    filename: 'build.js'
  },
  externals: {
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      components: path.resolve(__dirname, './assets/components'),
      css: path.resolve(__dirname, './assets/css'),
      fonts: path.resolve(__dirname, './assets/fonts'),
      img: path.resolve(__dirname, './assets/img'),
      js: path.resolve(__dirname, './assets/js'),
      modals: path.resolve(__dirname, './assets/modals'),
      scss: path.resolve(__dirname, './assets/scss'),
      'styles': path.resolve(__dirname, './src/style/')
    }
  },
  plugins: [
    new CopyWebpackPlugin([
        {from:'src/static', to:'static'} 
    ]), 
    new HtmlWebpackPlugin ({
      inject: true,
      template: '../index.html'
    })
  ],
  module: {
    rules: [
      
      {
        test: /\.css$/,  
        /*exclude: /node_modules/,  */
        loaders: ['style-loader', 'css-loader'],
      },
      { 
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('node_modules/vue-particles')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
        
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'style-loader!css-loader!sass-loader'
          }
          // other vue-loader options go here 
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  performance: {
    hints: false
  },

  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
