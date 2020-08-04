# Webpack 压缩插件

> Tips: 个人学习编写webpack 插件， 不建议生产环境使用

- [English](README.en_US.md)
- [简体中文](README.md)

> Webpack 压缩插件，支持 `gzip` `brotli` 压缩

- [安装](#安装)
- [使用](#使用)
- [配置](#配置)
- [建议](#建议)
- [License](#license)

## 安装
```bash
$ npm i @dking/webpack-compress-plugin --dev 
$ yarn add @dking/webpack-compress-plugin -D
```

## 使用

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
        deleteOriginalAssets: true, // 是否删除压缩前的文件，看情况配置, 默认false
        algorithm           : 'brotli', // 压缩算法，默认就是gzip
    })
  ]
};

```

## 配置

```js
// 配置文件
new CompressPlugin({ 
    deleteOriginalAssets: false, // 是否删除压缩前的文件，看情况配置默认 false
    algorithm           : 'gzip', // 压缩算法，默认就是gzip
    test                : /./, // 默认所有文件都压缩
    threshold           : 1000, // 只处理比这个值大的资源。按字节计算
    minRatio            : 0.8, // 只有压缩率比这个值小的资源才会被处理
})
```

## 建议
欢迎创建issue 或者 pr [here](https://github.com/webpack-contrib/compression-webpack-plugin/issues).

## License

[MIT](LICENSE)
