import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import elm from "rollup-plugin-elm";
import postcss from "rollup-plugin-postcss";

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
        elm({
            exclude: "src/Elm/elm-stuff/**",
            include: "src/Elm/Components/**",
            compiler: {
                pathToElm: "/usr/local/bin/elm"
            }
        }),
        babel({
            extensions,
            babelHelpers: "bundled",
            include: "src/**",
        }),
        postcss({
            extract: true,
        }),
        resolve({ extensions }),
        commonjs(),
    ],
};

export default options;
