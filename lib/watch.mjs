import chokidar from 'chokidar';
import path from 'path';
import { cpSync } from 'fs';
import {
  SRC_DIR,
  DIST_DIR,
  POSTS_DIR,
  STATIC_DIR,
  STYLES_DIR,
  SCRIPTS_DIR,
  TEMPLATES_DIR,
} from './constants';
import { buildPost, buildAllPosts } from './build/posts';
import { buildPage, pageConfigs, buildAllPages } from './build/pages';
import { buildStylesheet, buildAllStyles } from './build/styles';
import { buildScript } from './build/scripts';

const watcher = chokidar.watch(SRC_DIR, {
  ignoreInitial: true,
});

const postMatch = new RegExp(POSTS_DIR);
const staticMatch = new RegExp(STATIC_DIR);
const styleMatch = new RegExp(STYLES_DIR);
const scriptMatch = new RegExp(SCRIPTS_DIR);
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
      buildPage(pageMatch.src, pageMatch.name, pageMatch.data);
      // special handling for the post template
    } else if (filepath.includes('post.njk')) {
      buildAllPosts();
    } else {
      buildAllPages();
    }
  } else if (scriptMatch.test(filepath)) {
    buildScript(filepath);
  } else {
    console.log('Ignoring unhandled file type');
  }
};

watcher
  .on('change', (filepath) => updateHandler(filepath, 'changed'))
  .on('add', (filepath) => updateHandler(filepath, 'added'));

console.log(`Watching ${SRC_DIR} for changes`);
