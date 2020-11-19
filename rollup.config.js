import commonjs from 'rollup-plugin-commonjs';
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import scss from 'rollup-plugin-scss'
import postcss from 'rollup-plugin-postcss'
import pkg from "./package.json";

const extensions = ['.js', '.jsx', '.ts', '.tsx']; // 어떤 확장자를 처리 할 지 정함

export default {
    input: "src/index.tsx",
    plugins: [
        peerDepsExternal(),
        resolve({ extensions }),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
        external(),
        // 'default' is not exported by scss error 해결용
        postcss({
            extract: 'my-custom-file-name.css'
        })
    ],
    output: [
        {
            file: pkg.module,
            format: 'es',
            inlineDynamicImports: true
        }
    ]
};