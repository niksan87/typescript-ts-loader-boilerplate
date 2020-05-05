const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputNameFormat = '[name]';
const mode = process.env.NODE_ENV || 'development';
const entry = {
    index: [
        path.resolve(__dirname, './'),
        // path.resolve(__dirname, './src/styles.css'),
        path.resolve(__dirname, './node_modules/webpack-hot-middleware/client')
        // path.resolve(
        //     __dirname,
        //     "./node_modules/webpack-hot-middleware/client?reload=true"
        // ),
    ]
};

module.exports = {
    mode: 'development',
    entry: entry,
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `${outputNameFormat}.js`
    },
    optimization: {
        namedModules: true,
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: ['.js', '.ts', '.css'],
        alias: {
            src: path.resolve(__dirname, './src')
        }
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
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: [
                    path.resolve(__dirname, './index'),
                    path.resolve(__dirname, './src')
                ],
                loaders: ['ts-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    }
};
