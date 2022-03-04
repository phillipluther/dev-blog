import chokidar from 'chokidar';
import path from 'path';
import { cpSync } from 'fs';
import { SRC_DIR, DIST_DIR, POSTS_DIR, STATIC_DIR, STYLES_DIR, TEMPLATES_DIR } from './constants';
import { buildPost } from './build/posts';
import { buildPage, pageConfigs, buildAllPages } from './build/pages';
import { buildStylesheet, buildAllStyles } from './build/styles';

const watcher = chokidar.watch(SRC_DIR, {
  ignoreInitial: true,
});

const postMatch = new RegExp(POSTS_DIR);
const staticMatch = new RegExp(STATIC_DIR);
const styleMatch = new RegExp(STYLES_DIR);
const templateMatch = new RegExp(TEMPLATES_DIR);

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
  } else if (styleMatch.test(filepath)) {
    if (filepath.includes('partials')) {
      buildAllStyles();
    } else {
      buildStylesheet(filepath);
    }
  } else if (templateMatch.test(filepath)) {
    const pageMatch = pageConfigs.find(({ src }) => src === filepath);

    if (pageMatch) {
      buildPage(pageMatch.src, pageMatch.name);
    } else {
      buildAllPages();
    }
  } else {
    console.log('Ignoring unhandled file type');
  }
};

watcher
  .on('change', (filepath) => updateHandler(filepath, 'changed'))
  .on('add', (filepath) => updateHandler(filepath, 'added'))
  .on('error', (error) => {
    console.log('SWALLOWED');
  });

console.log(`Watching ${SRC_DIR} for changes`);
