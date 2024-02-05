import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

export default {
  input: './index.ts',
  output: [
    {
      file: './dist/index.cjs',
      format: 'cjs',
    },
    {
      file: './dist/index.mjs',
      format: 'es',
    },
  ],
  plugins: [typescript(), dts()],
  external: ['vue-demi'],
};
