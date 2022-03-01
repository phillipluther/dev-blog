import chokidar from 'chokidar';
import path from 'path';
import { cpSync } from 'fs';
import { SRC_DIR, DIST_DIR, POSTS_DIR, STATIC_DIR } from './constants';
import { buildPost } from './build/posts';

const watcher = chokidar.watch(SRC_DIR, {
  // ignored: /static/,
  ignoreInitial: true,
});

const postMatch = new RegExp(POSTS_DIR);
const staticMatch = new RegExp(STATIC_DIR);

// covers both 'change' and 'add' events
const updateHandler = (filepath, eventDescriptor) => {
  const shortName = filepath.replace(SRC_DIR, '');
  console.log(`${shortName} ${eventDescriptor}`);

  if (postMatch.test(filepath)) {
    buildPost(filepath.replace(POSTS_DIR, ''));
  } else if (staticMatch.test(filepath)) {
    const { dir, base } = path.parse(filepath);
    const dest = path.join(dir.replace(STATIC_DIR, DIST_DIR), base);

    cpSync(filepath, dest);
  }
};

watcher
  .on('change', (filepath) => updateHandler(filepath, 'changed'))
  .on('add', (filepath) => updateHandler(filepath, 'added'));

console.log(`[watch] Watching ${SRC_DIR} for changes`);
