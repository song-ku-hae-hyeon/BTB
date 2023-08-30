const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devEntry = path.resolve(__dirname, './src/index.tsx');
const prodEntry = {
  popup: path.join(__dirname, 'src/popup.tsx'),
  content: path.join(__dirname, 'src/content.tsx'),
  background: path.join(__dirname, 'src/background.ts'),
};

const config = {
  mode: process.env.NODE_ENV ?? 'production',
  entry: process.env.NODE_ENV === 'development' ? devEntry : prodEntry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /.svg$/,
        use: 'file-loader',
      },
      {
        test: /.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@recoil': path.resolve(__dirname, 'src/recoil'),
      '@static': path.resolve(__dirname, 'src/static'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@public': path.resolve(__dirname, 'public'),
    },
  },
  devServer: {
    static: './dist',
    compress: true,
    open: true,
    port: 3000,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
    new HtmlWebpackPlugin({
      filename: './public/index.html',
    }),
  ],
  devtool: 'source-map',
};

module.exports = config;
