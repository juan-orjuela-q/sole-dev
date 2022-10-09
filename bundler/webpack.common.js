const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      path: false,
    },
  },
  entry: {
    principal: path.resolve(__dirname, "../src/script.js"),
    /*loaders_maqueta: {
            import: path.resolve(__dirname, '../src/js/loaders.js'),
            dependOn: 'principal'
        },
        ui: path.resolve(__dirname, '../src/js/ui.js'),
        colores_texturas_materiales: path.resolve(__dirname, '../src/js/colores-texturas-materiales.js'),
        iteraccion: path.resolve(__dirname, '../src/js/interaccion.js'),
        modelos: path.resolve(__dirname, '../src/js/modelos.js'),
        debug: path.resolve(__dirname, '../src/js/debug.js'),
        run: path.resolve(__dirname, '../src/js/run.js')*/
  },
  output: {
    hashFunction: "xxhash64",
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../static") }],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      minify: true,
    }),
    new MiniCSSExtractPlugin(),
  ],
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },

      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      //SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"],
      },

      // CSS
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
    ],
  },
};
