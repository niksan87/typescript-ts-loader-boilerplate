const path = require( 'path' );
const Webpack = require( 'webpack' );
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/main'),
    devtool: 'source-map',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: '[name].[hash:8].js',
    },
    optimization: {
        splitChunks: {
        chunks: 'all',
        },
    },
    module: {
        rules: [{
            test: /\.(ts|js)x?$/,
            include: [
                path.resolve( __dirname, 'src' )
            ],
            loaders: ['ts-loader'],
        }],
    },
    devServer: {
        stats: {
            all: false,
            timings: true
        },
        host: process.env.HOST,
        port: process.env.PORT,
        open: false,
        overlay: true
    },
    resolve: {
        extensions: ['.js','.ts']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Webpack.HashedModuleIdsPlugin(),
        new Webpack.ProvidePlugin({
            'PIXI': path.resolve(__dirname, './node_modules/pixi.js'),
            'gsap': [path.resolve(__dirname, './node_modules/gsap'), 'default' ]
        }),
        new HtmlWebpackPlugin({
            title: 'webpack-typescript-boilerplate'
        })
    ]
};