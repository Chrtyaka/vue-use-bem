import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: './index.ts',
    output: [
      {
        file: './dist/index.cjs',
        format: 'cjs',
      },
      {
        file: './dist/index.js',
        format: 'es',
      },
    ],
    plugins: [typescript({ declaration: false, declarationDir: undefined })],
    external: ['vue'],
  },
  {
    input: './index.ts',
    output: [{ file: './dist/index.d.ts' }, { file: './dist/index.d.cts' }],
    plugins: [dts()],
    external: ['vue'],
  },
];
