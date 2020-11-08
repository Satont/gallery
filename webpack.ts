import VueLoaderPlugin from 'vue-loader/lib/plugin'
import HtmlPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { resolve } from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'

const isDev = () => process.env.NODE_ENV === 'development'

export default {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: {
    main: './src/web/index.ts',
  },
  output: {
    path: resolve(__dirname, 'public', 'dest'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    pathinfo: false,
    publicPath: '/dest/',
  },
  performance: { hints: false },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/i,
        use: [
          isDev() ? 'vue-style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev(),
              esModule: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.ts$/i,
        use: {
          loader: 'ts-loader',
          options: { experimentalFileCaching: true, appendTsSuffixTo: [/\.vue$/] },
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new HtmlPlugin({
      filename: '../index.html',
      template: 'src/web/index.html',
      chunks: ['main'],
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  devServer: {
    compress: true,
    port: 3002,
    contentBase: './public',
    publicPath: '/dest/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
}
