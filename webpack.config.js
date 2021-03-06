const PORT = require('./src/server/server');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/client/index.jsx',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  devServer: {
    publicPath: '/dist/',
    contentBase: '/src/client/views',
    port: 8080,
    proxy: {
      context: () => true,
      target: `http://localhost:${PORT}`,
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
