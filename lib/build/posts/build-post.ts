import path from 'path';
import { writeFileSync } from 'fs';
import readdirp from 'readdirp';
import { VFileValue } from 'vfile';
import { DIST_DIR, SITE_URL, TEMPLATES_DIR, POSTS_DIR } from '../../constants';
import { ensure, nunjucks, processMarkdown, processImage } from '../utils';

export type Post = {
  title: string;
  url: URL;
  metadata: {
    date: string;
    description: string;
    cover: string;
    cover_credit: string;
    cover_alt: string;
    cover_credit_link: string;
    tags: string[];
    type: string;
    slug: string;
  };
  content: VFileValue;
};

export type Frontmatter = Post['metadata'] & { title: string };

export async function getPostData(src: string): Promise<Post> {
  const { name: slug } = path.parse(src);
  const filepath = path.isAbsolute(src) === false ? path.join(POSTS_DIR, src) : src;
  const { data, value: content } = await processMarkdown(filepath);
  const { title, ...metadata } = data.matter as Frontmatter;

  return {
    title,
    url: new URL(slug, SITE_URL),
    metadata: {
      ...metadata,
      slug,
      type: 'article',
    },
    content,
  };
}

export default async function buildPost(
  srcFile: string,
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

  const { dir } = path.parse(srcFile);
  const srcDir = path.join(options.postsDir, dir);
  const postData = await getPostData(srcFile);
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
