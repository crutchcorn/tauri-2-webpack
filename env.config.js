import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath(import.meta.url));

export const outputConfig = {
    destPath: "./dist"
};

export const entryConfig = [
    "./src/main.tsx",
];

export const devServer = {
    static: {
        directory: path.join(__dirname, outputConfig.destPath),
    },
    port: "8080"
};

export const terserPluginConfig = {
    extractComments: false,
    terserOptions: {
        compress: {
            drop_console: true,
        },
    }
};
