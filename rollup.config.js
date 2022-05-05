import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "./src/index.ts",
    output: [
        {
            format: "cjs",
            file: pkg.main,
            sourcemap: true,
        },
        {
            format: "es",
            file: pkg.esmain,
            sourcemap: true,
        },

    ],
    plugins: [
        typescript()
    ],
    onwarn: (msg, warn) => {
        // 忽略 Circular 的错误
        if (!/Circular/.test(msg)) {
            warn(msg);
        }
    },
};
