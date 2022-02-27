import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import readdirp from 'readdirp';
import { DIST_DIR, POSTS_DIR, TEMPLATE_DIR, SITE_URL } from './utils/constants.mjs';
import nunjucks from './utils/nunjucks-env.mjs';
import clean from './utils/clean.mjs';
import processMarkdown from './utils/process-markdown.mjs';
import processImage from './utils/process-image.mjs';

clean();

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

  const rendered = nunjucks.render(path.join(TEMPLATE_DIR, 'post.njk'), {
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
    if (/(\.jpg|\.png)$/.test(asset.path)) {
      const processed = await processImage(asset.fullPath);

      Object.keys(processed).forEach((size) => {
        const { name, data } = processed[size];
        writeFileSync(path.join(destDir, name), data);
      });
    }
  }
}
