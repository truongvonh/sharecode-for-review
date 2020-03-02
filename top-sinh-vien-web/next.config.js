const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

const cssConfig = {
  cssModules: false,
  cssLoaderOptions: {
    url: false,
    importLoaders: 1,
    localIdentName: '[local]___[name]___[hash:base64:5]'
  }
};

const sassConfig = {
  cssModules: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[name]___[hash:base64:5]'
  }
};

const nextConfig = {
  webpack(config, option) {
    config.resolve.modules.push(path.resolve('./'));
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  }
};

const imagesConfig = {
  inlineImageLimit: 8192,
  imagesFolder: 'images',
  imagesName: '[name]-[hash].[ext]',
  handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
  optimizeImages: true,
  optimizeImagesInDev: false,
  mozjpeg: {
    quality: 10,
    optimizationLevel: 3,
  },
  optipng: {
    quality: 10,
    optimizationLevel: 3,
  },
  pngquant: {
    quality: [0.3, 0.5],
    optimizationLevel: 3,
  },
  svgo: {
    quality: 10,
    optimizationLevel: 1,
  },
  webp: {
    preset: 'default',
    quality: 75,
  },
};

// module.exports = withPlugins([[withSass, sassConfig]], nextConfig);
module.exports = withPlugins([
  [withSass, sassConfig],
  [withCSS, cssConfig],
  [optimizedImages, imagesConfig]
], nextConfig);
