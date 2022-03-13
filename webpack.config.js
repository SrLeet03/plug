var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app/index.js',
    output : {
        path: __dirname + '/dist',
       publicPath: '/',
       filename: 'bundle.js'
    },
    resolve: {
        extensions: [  '.js', '.jsx', '.css'],
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']},
             {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'] // include eslint-loader
              }
        ]
    },
    mode:'development',
    devServer: {
        historyApiFallback: true,
        inline: false,
        contentBase: "./dist",
      },    
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'app/index.html'
        })
    ]

}

