exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        // Display only errors to reduce the amount of output.
        stats: 'errors-only',
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        open: true, // Open the page in browser
        overlay: true,
    },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,

                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    },
});