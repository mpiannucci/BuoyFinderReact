var path = require('path');

module.exports = {
    mode: 'development',
    entry: "./index.web.js",
    output: {
        path: __dirname,
        filename: "index-compiled.web.js"
    },
    module: {
        rules: [
            { test: /.tsx?$/, loader: "ts-loader" },
            { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
        ]
    },
    resolve: {
        extensions: ['.ts', '.web.tsx', '.tsx', '.web.js', '.js'],
        alias: {
            'react-native$': 'react-native-web',
            'navigation-react-native$': path.resolve(__dirname, 'navigation-react-native-web.js'),
        }
    }
};