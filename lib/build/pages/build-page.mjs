import path from 'path';
import { writeFileSync } from 'fs';
import { DIST_DIR, PAGES_DIR } from '../../constants';
import { ensure, nunjucks } from '../utils';

export default async function buildPage(srcFile, slug = '') {
  const timerHandle = `[build-page] Rendered ${srcFile.replace(PAGES_DIR, '')}`;

  console.time(timerHandle);

  const destDir = path.join(DIST_DIR, slug);
  const rendered = nunjucks.render(srcFile);

  ensure(destDir);
  writeFileSync(path.join(destDir, 'index.html'), rendered);

  console.timeEnd(timerHandle);
}
