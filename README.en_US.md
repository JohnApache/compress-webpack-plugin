# Webpack Compress Plugin

> Tips: Personal learning to write webpack plug-ins, not recommended for production environment

- [English](README.en_US.md)
- [简体中文](README.md)

> Webpack-Compress-Plugin support `gzip` and `brotli` compress.

- [Install](#install)
- [Usage](#usage)
- [Configuration](#configuration)
- [Questions](#questions)
- [License](#license)

## Install
```bash
$ npm i @dking/webpack-compress-plugin --dev 
$ yarn add @dking/webpack-compress-plugin -D
```

## Usage

```js
// webpack.config.js
const path = require('path');
const CompressPlugin = require('@dking/compress-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CompressPlugin({ 
        deleteOriginalAssets: true, 
        algorithm           : 'brotli',
    })
  ]
};
```

## Configuration

```js
new CompressPlugin({ 
    deleteOriginalAssets: false, // Whether to delete the files before compression depends on the situation. The default setting is false
    algorithm           : 'gzip', // Compression algorithm, the default is gzip
    test                : /./, // All files are compressed by default
    threshold           : 1000, // Only resources larger than this value are processed. In bytes
    minRatio            : 0.8, // Only resources with a compression ratio lower than this value will be processed
})
```

## Questions
Please open an issue [here](https://github.com/webpack-contrib/compression-webpack-plugin/issues).

## License

[MIT](LICENSE)
