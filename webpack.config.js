const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', path.join(__dirname, '/client/src/index.jsx')],
  module: {
    rules: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/client/dist'),
  },
  resolve: { extensions: ['.js', '.jsx'] },
};
