module.exports = {
  mode: 'development',
  entry: './src/client/index.jsx',
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].[chunkhash:8].js',
  },
  devServer: {
    publicPath: '/dist/',
    contentBase: './src/client/views',
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
