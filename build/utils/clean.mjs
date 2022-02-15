import { rmSync, mkdirSync } from 'fs';
import { DIST_DIR } from './constants.mjs';

export default function clean() {
  rmSync(DIST_DIR, {
    recursive: true,
  });
  mkdirSync(DIST_DIR);
}
