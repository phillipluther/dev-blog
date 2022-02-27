import { mkdirSync, existsSync } from 'fs';
import { DIST_DIR } from './constants.mjs';

export default function (dest = DIST_DIR) {
  if (existsSync(dest) === false) {
    mkdirSync(dest, {
      recursive: true,
    });
  }
}
