import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import postcss from 'postcss';
import cssnano from 'cssnano';
import nested from 'postcss-nested';
import nestedVars from 'postcss-nested-vars';
import { DIST_DIR, STYLES_DIR } from '../constants';
import { ensure, isCli } from './utils';

const plugins = [nested, nestedVars];

export default async function buildStyles(isProd = false) {
  ensure(DIST_DIR);

  const srcFile = path.join(STYLES_DIR, 'index.css');
  const distFile = path.join(DIST_DIR, 'styles.css');
  const timerHandle = '[styles] Success!';

  if (isProd) {
    plugins.push(cssnano);
  }

  console.time(timerHandle);

  const raw = await readFile(srcFile);
  const processed = await postcss(plugins).process(raw, {
    from: srcFile,
    to: distFile,
    map: {
      inline: !isProd,
    },
  });

  await writeFile(distFile, processed.css);

  if (processed.map) {
    await writeFile(`${distFile}.map`, processed.map.toString());
  }

  console.timeEnd(timerHandle);
}

if (isCli('styles')) {
  buildStyles();
}
