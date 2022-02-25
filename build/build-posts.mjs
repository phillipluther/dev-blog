import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import readdirp from 'readdirp';
import hb from 'handlebars';
import { DIST_DIR, POSTS_DIR, TEMPLATE_DIR, SITE_URL } from './utils/constants.mjs';
import clean from './utils/clean.mjs';
import processMarkdown from './utils/process-markdown.mjs';

clean();

const postTemplateContent = readFileSync(path.join(TEMPLATE_DIR, 'base.hbs'), 'utf8');
const postTemplate = hb.compile(postTemplateContent);

for await (const entry of readdirp(POSTS_DIR, {
  fileFilter: ['**/*.md'],
})) {
  const { name: slug, dir } = path.parse(entry.path);
  const srcDir = path.join(POSTS_DIR, dir);
  const destDir = path.join(DIST_DIR, slug);

  mkdirSync(destDir, {
    recursive: true,
  });

  const { data, value: content } = await processMarkdown(path.join(POSTS_DIR, entry.path));
  const { title, ...metadata } = data.matter;

  const rendered = postTemplate({
    title,
    url: new URL(slug, SITE_URL),
    metadata: {
      ...metadata,
      type: 'article',
    },
    content,
  });

  writeFileSync(path.join(destDir, 'index.html'), rendered);

  // process assets from the directory
  for await (const asset of readdirp(srcDir, {
    fileFilter: ['!**/*.md'],
  })) {
    if (/(\.jpg|\.png|\.gif)$/.test(asset.path)) {
      copyFileSync(asset.fullPath, path.join(destDir, asset.basename));
    }
  }
}
