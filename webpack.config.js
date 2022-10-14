const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ESLint = require('eslint-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',
};

const getFiles = (dir, filetype) => {
  return dir.map((folder) => {
    const folderPath = `${PAGES_DIR}/${folder}`;
    const folderFiles = fs.readdirSync(folderPath);
    const file = folderFiles.find((filename) =>
      filename.endsWith(`.${filetype}`)
    );
    return file;
  });
};

const PAGES_DIR = `${PATHS.src}/pages`;
const PAGES_FOLDERS = fs.readdirSync(PAGES_DIR);
const PAGES = getFiles(PAGES_FOLDERS, 'pug');
const PAGES_ENTRY_FILES = getFiles(PAGES_FOLDERS, 'js');
const PAGES_ENTRYS = {};

PAGES_ENTRY_FILES.forEach((pageEntryFile, index) => {
  const filename = pageEntryFile.split('.')[0];
  PAGES_ENTRYS[
    filename
  ] = `${PAGES_DIR}/${PAGES_FOLDERS[index]}/${pageEntryFile}`;
});

const optimization = () => {
  const config = {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  };

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin({
        parallel: true,
      }),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            exclude: [/fonts/],
            plugins: [
              'imagemin-gifsicle',
              'imagemin-mozjpeg',
              'imagemin-pngquant',
              'imagemin-svgo',
            ],
          },
        },
      }),
    ];
  }

  return config;
};

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;
const assetFileName = isDev ? `[name][ext]` : `[hash][ext][query]`;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [['postcss-preset-env']],
        },
      },
    },
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
    cacheDirectory: true,
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(),
    },
  ];

  // if (isDev) {
  //   loaders.push();
  // }

  return loaders;
};

const plugins = () => {
  const base = [
    ...PAGES.map(
      (page, index) =>
        new HTMLWebpackPlugin({
          template: `${PAGES_DIR}/${PAGES_FOLDERS[index]}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
          chunks: [`${page.replace(/\.pug/, '')}`],
          inject: 'body',
          minify: {
            collapseWhitespace: isProd,
          },
        })
    ),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/${filename('css')}`,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: `${PATHS.src}/static`,
    //       to: `${PATHS.dist}/static`,
    //     },
    //   ],
    // }),
  ];

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: PAGES_ENTRYS,
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    clean: true,
  },
  cache: {
    type: 'memory',
  },
  resolve: {
    extensions: ['.js', '.json', '.pug', '.scss'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
  optimization: optimization(),
  target: 'web',
  devServer: {
    compress: true,
    port: 8081,
    hot: isDev,
    open: {
      target: ['main-page.html'],
      app: {
        name: 'chrome',
      },
    },
  },
  devtool: isDev ? 'source-map' : false,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: isDev,
          },
        },
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.(sass|scss)$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(?:ico|png|jpg|jpeg|svg|gif)$/,
        type: 'asset/resource',
        exclude: [/fonts/],
        generator: {
          filename: `${PATHS.assets}img/${assetFileName}`,
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf|svg)$/,
        type: 'asset/resource',
        include: [/fonts/],
        generator: {
          filename: `${PATHS.assets}fonts/${assetFileName}`,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
