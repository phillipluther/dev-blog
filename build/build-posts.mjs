import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import readdirp from 'readdirp';
import hb from 'handlebars';
import { DIST_DIR, POSTS_DIR, TEMPLATE_DIR } from './utils/constants.mjs';
import clean from './utils/clean.mjs';
import processMarkdown from './utils/process-markdown.mjs';

clean();

const postTemplateContent = readFileSync(path.join(TEMPLATE_DIR, 'base.hbs'), 'utf8');
const postTemplate = hb.compile(postTemplateContent);

for await (const entry of readdirp(POSTS_DIR)) {
  if (/\.md$/.test(entry.path)) {
    const { data, value: content } = await processMarkdown(path.join(POSTS_DIR, entry.path));
    const { title, ...metadata } = data.matter;

    const rendered = postTemplate({
      title,
      url: new URL(data.meta.pathname, data.meta.origin),
      metadata,
      content,
    });

    const postDir = path.join(DIST_DIR, data.meta.pathname);

    mkdirSync(postDir, {
      recursive: true,
    });

    writeFileSync(path.join(postDir, 'index.html'), rendered);
  } else {
    console.warn(`Warning: Ignoring unknown file type ${entry.path}`);
  }
}
