import path from 'path';
import { writeFileSync } from 'fs';
import readdirp from 'readdirp';
import { DIST_DIR, SITE_URL, TEMPLATES_DIR, POSTS_DIR } from '../../constants';
import { ensure, nunjucks, processMarkdown, processImage, buildSrcset } from '../utils';

export async function getPostData(src) {
  const { name: slug } = path.parse(src);
  const filepath = path.isAbsolute(src) === false ? path.join(POSTS_DIR, src) : src;
  const { data, value: content } = await processMarkdown(filepath);
  const { title, cover, cover_alt, cover_credit, cover_credit_link, ...metadata } = data.matter;
  const { name: coverImageName } = path.parse(cover);

  return {
    title,
    url: new URL(slug, SITE_URL),
    metadata: {
      ...metadata,
      cover: {
        placeholder: path.join(slug, `${coverImageName}-placeholder.jpg`),
        srcset: buildSrcset(path.join('/', slug, cover)),
        alt: cover_alt,
        credit: cover_credit,
        creditLink: cover_credit_link,
      },
      slug,
      type: 'article',
    },
    content,
  };
}

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

  const shortName = srcFile.replace(POSTS_DIR, '');
  const renderTimer = `[build-post] Rendered ${shortName}`;
  const assetsTimer = `[build-post] Processed image assets for ${shortName}`;

  console.time(renderTimer);

  const { dir, base } = path.parse(srcFile);
  const srcDir = path.join(options.postsDir, dir);
  // srcFile can come in during build or watch actions; normalize its path
  const srcFilepath = path.join(srcDir, base);

  const postData = await getPostData(srcFilepath);
  const destDir = path.join(DIST_DIR, postData.metadata.slug);
  const rendered = nunjucks.render(path.join(TEMPLATES_DIR, 'post.njk'), postData);

  ensure(destDir);
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
