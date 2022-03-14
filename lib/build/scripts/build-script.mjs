import path from 'path';
import { rollup } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { SCRIPTS_DIR, DIST_DIR } from '../../constants';

export default async function buildScript(script, isProd = false) {
  const srcPath = path.isAbsolute(script) ? script : path.join(SCRIPTS_DIR, script);
  const distFilename = `${path.parse(srcPath).name}.js`;
  const distFile = path.join(DIST_DIR, distFilename);

  const timerHandle = `[build-script] Built ${distFilename}`;

  console.time(timerHandle);

  const plugins = [nodeResolve(), commonjs()];

  if (isProd) {
    plugins.push(terser());
  }

  const bundle = await rollup({
    input: srcPath,
    plugins,
  });

  await bundle.write({
    file: distFile,
    format: 'iife',
    name: distFilename,
    sourcemap: true,
  });

  console.timeEnd(timerHandle);
}
