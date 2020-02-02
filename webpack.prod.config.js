const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                parallel: true,
                uglifyOptions: {
                    output: {
                        comments: false,
                        beautify: true
                    },
                    compress: false
                }
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    discardDuplicates: { removeAll: true },
                    discardComments: {removeAll: true }
                },
                canPrint: true
            })
        ],
    },
    plugins: [
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            optipng: null,
            jpegtran: null,
            plugins: [
                imageminMozjpeg({
                    quality: 90,
                    progressive: true
                }),
                imageminPngquant({
                    quality: [0.90, 0.95]
                })
            ]
        })
    ]
});