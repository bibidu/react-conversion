import json from 'rollup-plugin-json'
import common from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
    input: 'entry.js',
    output: {
        file: 'bundle.js',
        format: 'es',
        name: 'roll',
    },
    plugins: [
        json(),
        common(),
        resolve({
        }),
        // babel({
        //     exclude: 'node_modules/**'
        // })
    ]
}