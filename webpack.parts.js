const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.extractCSS = ({ include, exclude, use = [] }) => {
    // Output extracted CSS to a file
    const plugin = new MiniCssExtractPlugin({
        filename: 'styles/[name].css',
    });

    return {
        module: {
            rules: [
                {
                    test: /\.(css|scss)$/,
                    include,
                    exclude,

                    use: [
                        MiniCssExtractPlugin.loader,
                    ].concat(use),
                },
            ],
        },
        plugins: [plugin],
    };
};

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
                test: /\.(css|scss)$/,
                include,
                exclude,

                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    },
});