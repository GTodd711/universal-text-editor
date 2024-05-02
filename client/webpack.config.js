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
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js', // Use [name] placeholder for unique filenames
      publicPath: '/',
    },
    devServer: {
      host: 'localhost',
      port: 8080,
      hot: true,
      open: true,
      historyApiFallback: {
        rewrites: [
          { from: /^\/$/, to: '/index.html' }, // Redirect root to index.html
          { from: /./, to: '/404.html' }, // Redirect all other routes to 404.html
        ],
      },
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', 
        filename: 'index.html',
      }),

      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'service-worker.js', 
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A simple text editor for everyone.',
        start_url: '/',
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
          include: path.resolve(__dirname, '/src/css/style.css'),
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

