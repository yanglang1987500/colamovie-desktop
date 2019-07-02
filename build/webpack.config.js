const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (env, options) => {
  const publicPath = "" ;
  return {
    devServer: {
      contentBase: path.join(__dirname, "../app/output"),
      host: "localhost",
      compress: true,
      port: 8086,
      proxy: {
        "/api": {
          target: "https://localhost:44377/",
          // changeOrigin: true,     // target是域名的话，需要这个参数，
          secure: false // 设置支持https协议的代理
        }
      }
    },
    context: path.join(__dirname, "../src"),
    resolve: {
      modules: [path.join(__dirname, "../src"), "node_modules"],
      alias: {
        "@business": path.join(__dirname, "../src/business"),
        "@common": path.join(__dirname, "../src/common"),
        "@pages": path.join(__dirname, "../src/pages"),
        "@containers": path.join(__dirname, "../src/containers"),
        "@store": path.join(__dirname, "../src/store"),
        "@router": path.join(__dirname, "../src/router"),
        "@components": path.join(__dirname, "../src/components"),
        "@locales": path.join(__dirname, "../src/locales"),
        "@http": path.join(__dirname, "../src/common/utils/http.ts")
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".less", ".mess"]
    },
    entry: {
      index: "index.tsx"
    },
    output: {
      path: path.join(__dirname, '../app/output'),
      filename: "[name].js",
      chunkFilename: "chunks/[name].[chunkhash:8].js",
      publicPath: publicPath
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "source-map-loader"
        },
        {
          test: /(\.js)|(\.jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["react", "es2015", "stage-0", "mobx"],
            plugins: ["transform-runtime"]
          }
        },
        {
          test: /(\.ts)|(\.tsx)$/,
          exclude: [/node_modules/, /\.test.tsx?$/],
          use: [{
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
        },
        {
          test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "react/sources/images/[name].[ext]"
          }
        }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.join(__dirname, "../tsconfig.json")
      }),     
      new HtmlWebpackPlugin({
        hash: true,
        inject: true,
        chunks: ["index"],
        template: "index.html",
        filename: "index.html"
      }),
    ],
    target: 'electron-renderer'
  };
};
