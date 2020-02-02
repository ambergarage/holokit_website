const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const nunjucks = require('nunjucks');

const yaml = require('js-yaml');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const wait = require('wait-for-stuff');
const isProduction = process.argv.indexOf('production') >= 0;

const basePath = __dirname;
const srcPath = 'src';
const distPath = 'dist';
const publicPath = '/';


const fs = require('fs');
const walkSync = (d) => fs.statSync(d).isDirectory() ? fs.readdirSync(d).map(f => walkSync(path.join(d, f))) : d;

const siteData = merge({
    root: publicPath,
  }, function () {
    const templateDir = path.join(basePath, `${srcPath}/data`);
    const allFiles = walkSync(templateDir);
    let obj = {};

    allFiles.forEach(function(item) {
      const dir = item.substring(0, item.lastIndexOf("/"));
      const dirOutput = dir.split(templateDir.split('./')[1])[1];
      const file = item.substring(item.lastIndexOf('/') + 1);
      const name = file.split('.')[0];
      const extension = file.split('.')[1];

      if (name && extension == 'json') {
        obj[name] = require(`${dir}/${name}.${extension}`);
      } else if (name && (extension == 'yml' || extension == 'yaml')) {
        obj[name] = yaml.load(fs.readFileSync(`${dir}/${name}.${extension}`, 'utf8'));
      }
    });
    return obj;
}());

// Common config
// -----------------------------------------------------------------------------

module.exports = {
  stats: {
    colors: true,
    timings: true,
    children: false,
    chunks: true
  },
  performance: {
    hints: false
  },
  context: path.join(basePath, srcPath),
  entry: {
    main: [
      'assets/js/main.js',
      'assets/scss/main.scss'
    ],
  },
  output: {
    path: path.join(basePath, distPath),
    filename: 'js/[name].[hash].js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.scss', '.html', '.ejs'],
    alias: {
      node_modules: path.join(basePath, 'node_modules'),
      data: path.join(basePath, `${srcPath}/data`),
      assets: path.join(basePath, `${srcPath}/assets`),
      modules: path.join(basePath, `${srcPath}/assets/js/modules`),
      layouts: path.join(basePath, `${srcPath}/templates/layouts`),
      pages: path.join(basePath, `${srcPath}/templates/pages`),
      partials: path.join(basePath, `${srcPath}/templates/partials`),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /(a-z A-Z 0-9)*\/(font?s)\//,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/i,
        exclude: /(a-z A-Z 0-9)*\/(img|image?s)\//,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          },
        }],
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(basePath, 'postcss.config.js')
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.njk$/,
        use: [{
          loader: 'render-template-loader',
          options: {
            engine: function(input, locals, engineOptions) {
              var env = nunjucks.configure([path.join(basePath, `${srcPath}/templates`)]);

              let result = wait.for.promise(new Promise((resolve, reject) => {
                env.renderString(input, locals, function (err, res) {
                  if (err) {
                    reject(err);
                  }
                  resolve(res);
                });
              }).then((outputHtml) => {
                return outputHtml;
              }));

              if (typeof result === 'object') {
                throw new Error(result);
              }

              return result;
            },
            locals: siteData
          }
        }],
      }
    ],
  },
  watchOptions: {
        aggregateTimeout: 1000,
        ignored: /node_modules/,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          minChunks: 2,
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/
        }
      }
    },
    runtimeChunk: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new CopyWebpackPlugin([{
      context: 'assets/images',
      from: '**/*.{jpg,jpeg,png,gif,svg}',
      to: 'images'
    }, {
      context: 'assets/fonts',
      from: '**/*.{eot,ttf,svg,woff,woff2}',
      to: 'fonts'
    }, {
      from: 'static'
    }]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css'
    })
  ]
  .concat(function () {
    const templateDir = `${srcPath}/templates/pages`;
    const templates = walkSync(templateDir);

    return templates.map((item, key) => {
      const dir = item.substring(0, item.lastIndexOf("/"));
      const dirOutput = dir.split(templateDir)[1];
      const file = item.substring(item.lastIndexOf('/') + 1);
      const name = file.split('.')[0];
      const extension = file.split('.')[1];

      return new HtmlWebpackPlugin({
        minify: isProduction ? {
          html5                          : true,
          collapseWhitespace             : true,
          minifyCSS                      : true,
          minifyJS                       : true,
          minifyURLs                     : false,
          removeAttributeQuotes          : true,
          removeComments                 : true,
          removeEmptyAttributes          : true,
          removeOptionalTags             : true,
          removeRedundantAttributes      : true,
          removeScriptTypeAttributes     : true,
          removeStyleLinkTypeAttributese : true,
          useShortDoctype                : true
        } : {},
        filename: dirOutput ? `.${dirOutput}/${name}.html` : `${name}.html`,
        template: path.resolve(__dirname, `./${dir}/${name}.${extension}`)
      });
    });
  }())
  .concat([
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
  ])
};
