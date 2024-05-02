const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: '/src/js/index.js',
      install: '/src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js', // Use [name] placeholder for unique filenames
      path: path.resolve(__dirname, 'dist'),
          },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', 
        filename: 'index.html',
      }),

      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'src-sw.js', 
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A simple text editor for everyone.',
        start_url: '/',
        publicPath: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),

    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};

