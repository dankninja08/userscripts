const path = require('path');
const os = require('os');
const fs = require('fs');

const { BannerPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    addVideoControls: './src/addVideoControls.ts',
    downloadMobageCards: './src/downloadMobageCards.ts',
    searchModel: './src/searchModel.ts',
    searchScene: './src/searchScene.ts',
  },
  output: {
    path: path.join(
      os.homedir(),
      'Library',
      'Mobile Documents',
      'com~apple~CloudDocs',
      'Userscripts'
    ),
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
  plugins: [
    new BannerPlugin({
      banner: ({ filename }) => {
        const buf = fs.readFileSync(`./src/${filename.split('.')[0]}.ts`);

        return buf
          .toString()
          .match(/\/\/ ==UserScript==[\s\S]*\/\/ ==\/UserScript==/)[0];
      },
      raw: true,
    }),
  ],
};
