import path from 'path';
import { readFile, writeFile } from 'fs/promises';
import postcss from 'postcss';
import cssnano from 'cssnano';
import nested from 'postcss-nested';
import simpleVars from 'postcss-simple-vars';
import imports from 'postcss-import';
import customMedia from 'postcss-custom-media';
import { DIST_DIR, STYLES_DIR } from '../../constants';

const postcssPlugins = [nested, simpleVars, imports, customMedia];
let timerHandle;

export default async function (srcFilename, isProd = false) {
  try {
    const distFilename = path.basename(srcFilename);
    const srcPath = path.isAbsolute(srcFilename) ? srcFilename : path.join(STYLES_DIR, srcFilename);
    const distPath = path.join(DIST_DIR, distFilename);

    timerHandle = `[build-stylesheet] Built ${distFilename}`;

    if (isProd) {
      plugins.push(cssnano);
    }

    console.time(timerHandle);

    const raw = await readFile(srcPath);
    const processed = await postcss(postcssPlugins).process(raw, {
      from: srcPath,
      to: distPath,
      map: {
        inline: !isProd,
      },
    });

    await writeFile(distPath, processed.css);

    if (processed.map) {
      await writeFile(`${distPath}.map`, processed.map.toString());
    }

    console.timeEnd(timerHandle);
  } catch (err) {
    console.error(`${err.name}: ${err.reason}\n${err.file}, line ${err.line}`);
    console.timeEnd(timerHandle);
  }
}
