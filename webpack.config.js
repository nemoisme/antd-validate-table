const path = require('path')
const webpack = require('webpack')
const env = process.env.NODE_ENV
const join = dir => path.join(__dirname, dir)
const isPrd = env === 'production'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: './index.html',
    inject: 'body',
    minify: {
      removeComments: true
    }
  })
]


const libExternals = {
  react: {
    commonjs: 'react',
    commonjs2: 'react',
    amd: 'react',
    root: 'React',
  },
  'react-dom': {
    commonjs: 'react-dom',
    commonjs2: 'react-dom',
    amd: 'react-dom',
    root: 'ReactDOM',
  },
  'antd': 'antd',
  'lodash.set':'lodash.set'
}

module.exports = {
  mode: env,
  // 输入
  entry: isPrd ? join('./packages/index.tsx') : join('./examples/main.tsx'),
  //输出
  output: {
    path: join(isPrd ? './lib' : './dist'),
    filename: isPrd ? 'AntdValidateTable.js' : 'bundle.js',
    library: '[name].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  optimization: {
    minimizer:[new UglifyJsPlugin({test:/\.js(\?.*)?$/i,})],
    usedExports:true
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
        include: [join('./packages'), join('./examples')]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader"
      }
    ],
  },
  plugins: [].concat(isPrd ? [] : devPlugins),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  // 为了解决多个react 实例的问题 打包产生多个实例 有待解决实例冲突  暂时用这种方式解决
  externals:isPrd?libExternals:{},
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    overlay: {
      errors: true
    },
    inline: true,
    hot: true
  }
}