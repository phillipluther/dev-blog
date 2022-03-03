import path from 'path';
import { writeFileSync } from 'fs';
import readdirp from 'readdirp';
import { DIST_DIR, SITE_URL, TEMPLATES_DIR, POSTS_DIR } from '../../constants';
import { ensure, nunjucks, processMarkdown, processImage } from '../utils';

export default async function buildPost(
  srcFile,
  options = {
    postsDir: POSTS_DIR,
  },
) {
  if (!srcFile) {
    console.warn(`[buildPost] No source file provided; ignoring`);
    return false;
  }

  const { name: slug, dir } = path.parse(srcFile);
  const srcDir = path.join(options.postsDir, dir);
  const destDir = path.join(DIST_DIR, slug);

  const shortName = srcFile.replace(POSTS_DIR, '');
  const renderTimer = `[build-post] Rendered ${shortName}`;
  const assetsTimer = `[build-post] Processed image assets for ${shortName}`;

  ensure(destDir);

  console.time(renderTimer);

  const { data, value: content } = await processMarkdown(path.join(options.postsDir, srcFile));
  const { title, ...metadata } = data.matter;

  const rendered = nunjucks.render(path.join(TEMPLATES_DIR, 'post.njk'), {
    title,
    url: new URL(slug, SITE_URL),
    metadata: {
      ...metadata,
      type: 'article',
    },
    content,
  });

  writeFileSync(path.join(destDir, 'index.html'), rendered);

  console.timeEnd(renderTimer);
  console.time(assetsTimer);

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
  console.timeEnd(assetsTimer);
}
