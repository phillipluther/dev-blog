import { cpSync } from 'fs';
import { STATIC_DIR, DIST_DIR } from './utils/constants.mjs';
import ensure from './utils/ensure.mjs';

ensure(DIST_DIR);

cpSync(STATIC_DIR, DIST_DIR, {
  recursive: true,
});
