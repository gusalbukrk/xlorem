import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const { BundleAnalyzerPlugin } = WebpackBundleAnalyzer;

const __dirname = dirname(fileURLToPath(import.meta.url)); // eslint-disable-line no-underscore-dangle

export default merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/img/[name].[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      `...`, // // this is the minimizer overridden value that minimizes javascript
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',

          // force the creation of this chunk
          // by ignoring splitChunks default properties
          // (minSize, minChunks, maxAsyncRequests, maxInitialRequests)
          // enforce: true,
        },
      },
    },
  },
});
