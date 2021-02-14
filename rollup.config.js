import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
// import postcss from "rollup-plugin-postcss";
// import pkg from "./package.json";

const extensions = [".js", ".jsx"];

const options = {
    input: "src/",
    // external: ["react", "react-dom"],
    output: {
        dir: "dist",
        format: "iife",
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify("production")
        }),
        babel({
            extensions,
            babelHelpers: "bundled",
            include: "src/**",
        }),
        // postcss({
        //     extract: true,
        //     modules: true,
        // }),
        resolve({ extensions }),
        commonjs(),
    ],
};

export default options;
