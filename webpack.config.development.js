import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {outputConfig, entryConfig, devServer} from "./env.config.js"
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath(import.meta.url));

export default (env, options) => {
    return {
        mode: options.mode,
        entry: entryConfig,
        devServer,
        // Dev only
        // Target must be set to web for hmr to work with .browserlist
        // https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
        target: "web",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                }
            ],
        },
        resolve: {extensions: [".tsx", ".ts", ".js"]},
        output: {
            filename: "js/[name].bundle.js",
            path: path.resolve(__dirname, outputConfig.destPath),
            publicPath: "",
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                inject: true,
                minify: false
            }),
        ]
    };
};
