const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
    devtool: 'source-map',
    entry: [
        './app/js/index.js',
        './app/scss/index.scss'
    ],
    output: {
        filename: '[name].[hash:20].js',
        path: buildPath
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                use: {
                    loader: 'file-loader',
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(buildPath),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './app/terms-and-conditions.html',
            inject: 'body',
            filename: 'terms-and-conditions.html'
        }),
        new CopyWebpackPlugin([{ from: 'app/images', to: 'images' }]),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                map: {
                    inline: false,
                },
                discardComments: {
                    removeAll: true
                },
                discardUnused: false
            },
            canPrint: true
        })
    ]
};
