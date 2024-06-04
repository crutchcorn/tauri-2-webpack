import * as path from "path"
import {CleanWebpackPlugin} from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import {outputConfig, entryConfig, terserPluginConfig} from "./env.config.js"
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath(import.meta.url));

export default (env, options) => {
    {
        return {
            mode: options.mode,
            entry: entryConfig,
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: "ts-loader",
                        exclude: /node_modules/,
                    },
                ],
            },
            resolve: {extensions: [".tsx", ".ts", ".js"]},
            output: {
                filename: "js/[name].bundle.js",
                path: path.resolve(__dirname, outputConfig.destPath),
                publicPath: "",
            },
            optimization: {
                minimizer: [
                    new TerserPlugin(terserPluginConfig)
                ],
                splitChunks: {
                    chunks: "all",
                },
            },
            plugins: [
                new CleanWebpackPlugin(),
                new HtmlWebpackPlugin({
                    template: "./src/index.html",
                    inject: true,
                    minify: false
                }),
            ]
        };
    }
}
