import path from 'path';
import { writeFileSync } from 'fs';
import { DIST_DIR, TEMPLATES_DIR } from '../../constants';
import { ensure, nunjucks } from '../utils';

export default async function buildPage(srcFile, slug = '', data = async () => ({})) {
  const timerHandle = `[build-page] Rendered ${srcFile.replace(TEMPLATES_DIR, '')}`;

  console.time(timerHandle);

  const destDir = path.join(DIST_DIR, slug);
  const rendered = nunjucks.render(srcFile, await data());

  ensure(destDir);
  writeFileSync(path.join(destDir, 'index.html'), rendered);

  console.timeEnd(timerHandle);
}
