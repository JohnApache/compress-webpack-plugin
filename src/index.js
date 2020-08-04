const zlib = require('zlib');

const DEFAULT_COMPRESS_OPTIONS = {
    deleteOriginalAssets: false, // 是否删除压缩前的文件，看情况配置
    algorithm           : 'gzip', // 压缩算法，默认就是gzip
    test                : /./, // 所有文件都压缩
    threshold           : 1000, // 只处理比这个值大的资源。按字节计算
    minRatio            : 0.8, // 只有压缩率比这个值小的资源才会被处理
};

class CompressPlugin {

    constructor (options = {}) {
        this.options = {
            ...DEFAULT_COMPRESS_OPTIONS,
            ...options,
        };
    }

    compressSync (buf) {
        const { algorithm } = this.options;
        switch (algorithm.toLowerCase()) {
            case 'brotli':
                return zlib.brotliCompressSync(buf);
            case 'gzip':
                return zlib.gzipSync(buf);
            default:
                return buf;
        }
    }

    getComporessedName (filename) {
        const { algorithm } = this.options;
        switch (algorithm.toLowerCase()) {
            case 'brotli':
                return `${ filename }.br`;
            case 'gzip':
                return `${ filename }.gz`;
            default:
                return filename;
        }
    }

    apply (compiler) {
        const {
            deleteOriginalAssets, test, threshold, minRatio,
        } = this.options;

        compiler.hooks.emit.tap('CompressPlugin', compilation => {
            const assets = compilation.assets;
            Object.keys(assets).forEach(filename => {
                // 按文件名过滤，默认不过滤
                if (!test.test(filename)) return;
                const asset = assets[filename];

                // 只处理比这个值大的资源。按字节计算
                if (asset.size() <= threshold) return;

                // 不支持的压缩方式不处理
                const compressedAssetName = this.getComporessedName(filename);
                if (filename === compressedAssetName) return;
                const compressedAsset = this.compressSync(asset.source());

                // 返回文件大小， 按字节算
                const compressedAssetSize =
                    Buffer.isBuffer(compressedAsset) ?
                        Buffer.byteLength(compressedAsset, 'utf8') :
                        compressedAsset.length;

                // 只有压缩率比这个值小的资源才会被处理
                if ((compressedAssetSize / asset.size()) >= minRatio) return;

                assets[compressedAssetName] = {
                    // 返回文件内容
                    source: () =>

                        // fileContent 既可以是代表文本文件的字符串，也可以是代表二进制文件的 Buffer
                        compressedAsset,

                    // 返回文件大小， 按字节算
                    size: () => compressedAssetSize,
                };

                // 是否删除压缩前的文件，看情况配置
                if (deleteOriginalAssets) {
                    delete assets[filename];
                }

            });
        });
    }

}

module.exports = CompressPlugin;
