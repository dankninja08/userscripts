const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    addVideoControls: './src/addVideoControls.ts',
    downloadMobageCards: './src/downloadMobageCards.ts',
    extractVideo: './src/extractVideo.ts',
    manageTiktok: './src/manageTiktok.ts',
    searchModel: './src/searchModel.ts',
    searchScene: './src/searchScene.ts',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
};
