const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputNameFormat = '[name].[hash:6]';

module.exports = {
    mode: 'development',
    entry: [path.resolve(__dirname, 'src/main'), path.resolve(__dirname, 'src/styles')],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `${outputNameFormat}.js`
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        stats: {
            all: false,
            timings: true
        },
        host: process.env.HOST,
        port: 9000, //process.env.PORT,
        open: false,
        overlay: true
    },
    resolve: {
        extensions: ['.js', '.ts', '.css']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Webpack.HashedModuleIdsPlugin(),
        new Webpack.ProvidePlugin({
            PIXI: path.resolve(__dirname, './node_modules/pixi.js'),
            gsap: [path.resolve(__dirname, './node_modules/gsap'), 'default']
        }),
        new MiniCssExtractPlugin({
            filename: `${outputNameFormat}.css`
        }),
        new HtmlWebpackPlugin({
            title: 'webpack-typescript-boilerplate'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: [path.resolve(__dirname, 'src')],
                loaders: ['ts-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    }
};
