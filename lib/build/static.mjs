import { cpSync } from 'fs';
import { STATIC_DIR, DIST_DIR } from './utils/constants.mjs';
import { ensure, isCli } from './utils';

export default function buildStatic() {
  const timerName = '[static] Files successfully copied from `/static`';

  ensure(DIST_DIR);

  console.time(timerName);

  cpSync(STATIC_DIR, DIST_DIR, {
    recursive: true,
  });

  console.timeEnd(timerName);
}

if (isCli('static')) {
  buildStatic();
}
