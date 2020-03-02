require('dotenv').config({path: require('path').resolve(__dirname, '..', '.env')});
require('@babel/register')({
    babelrc: false,
    ignore: [ /(node_modules)/ ],
    presets: ['@babel/preset-env', '@babel/preset-react']
});
require('./server.js');