import readdirp from 'readdirp';
import { DIST_DIR, STYLES_DIR } from '../../constants';
import buildStylesheet from './build-stylesheet';
import { ensure } from '../utils';

export default async function buildStyles(isProd = false) {
  ensure(DIST_DIR);

  const timerHandle = '[build-all-styles] Success';
  console.time(timerHandle);

  for await (const entry of readdirp(STYLES_DIR, {
    fileFilter: ['**/*.css'],
    directoryFilter: ['!partials'],
  })) {
    await buildStylesheet(entry.path, isProd);
  }

  console.timeEnd(timerHandle);
}
