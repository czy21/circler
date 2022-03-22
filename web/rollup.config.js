import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import nested from "postcss-nested"; // 处理less
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default [
    {
        input: 'src/component/index.ts',
        external: ['react', 'antd'],
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            external(),
            resolve(),
            commonjs(),
            typescript({tsconfig: './tsconfig.build.json'}),
            postcss(),
            terser()
        ],
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{file: 'dist/index.d.ts', format: "esm"}],
        external: [/\.(css|less|scss)$/],
        plugins: [dts()],
    },
]