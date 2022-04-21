import pkg from "./package.json";

export default {
  input: "./src/index.ts",

  output: [
    {
      format: "cjs",
      file: pkg.main,
      sourcemap: true,
    }
  ],
  onwarn: (msg, warn) => {
    // 忽略 Circular 的错误
    if (!/Circular/.test(msg)) {
      warn(msg);
    }
  },
};
