import readdirp from 'readdirp';
import { DIST_DIR, SCRIPTS_DIR } from '../../constants';
import buildScript from './build-script';
import { ensure } from '../utils';

export default async function buildScripts(isProd = false) {
  ensure(DIST_DIR);

  const timerHandle = '[build-all-scripts] Success';
  console.time(timerHandle);

  for await (const entry of readdirp(SCRIPTS_DIR, {
    fileFilter: ['**/*.mjs'],
  })) {
    await buildScript(entry.path, isProd);
  }

  console.timeEnd(timerHandle);
}
