const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        './app/js/index.js',
        './app/scss/index.scss'
    ],
    devServer: {
        port: 9000,
        host: '192.168.100.8',
        /*host: 'localhost',*/
        contentBase: path.join(__dirname, './app/'),
        open: true,
        proxy: {
            '/api/**': {
               target: '192.168.100.8:9000',
                /*target: 'localhost:9000',*/
                secure: false,
                changeOrigin: true,
            }
        },
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
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader",
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
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            inject: true
        })
    ]
};