import chokidar from 'chokidar';
import { SRC_DIR, POSTS_DIR } from './constants';
import { buildPost } from './build/posts';

const watcher = chokidar.watch(SRC_DIR, {
  ignored: /static/,
  ignoreInitial: true,
});

const postMatch = new RegExp(POSTS_DIR);

watcher.on('change', (path) => {
  const shortName = path.replace(SRC_DIR, '');

  if (postMatch.test(path)) {
    console.log(`[watch] ${shortName} changed`);
    buildPost(path.replace(POSTS_DIR, ''));
  }
});

console.log(`[watch] Watching ${SRC_DIR} for changes`);
