const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const glob = require('glob');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'src'),
};

const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
            }),
        ],
    },
]);

const productionConfig = merge([
    parts.extractCSS({
        use: ['css-loader', parts.autoprefix(), 'sass-loader'],
    }),

    parts.purifyCSS({
        // Give paths to parse for rules. These should be absolute!
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),

    parts.loadImages({
        options: {
            limit: 15000,
            name: '[path][name].[ext]',
            publicPath: '../',
            context: 'src',
        },
    }),
]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),

    parts.loadCSS(),

    parts.loadImages(),
]);

module.exports = mode => {
    if (mode === 'production') {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
}