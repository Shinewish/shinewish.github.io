const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './prod/bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-3'],
                    },
                },
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
};
