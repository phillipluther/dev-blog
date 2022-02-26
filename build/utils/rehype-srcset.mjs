/**
 * TODO: turn this into a bonafide Rehype plugin; there doesn't seem to be anything else that
 * does quite what we need ... a transformer to add customizable srcset attributes to <img> tags
 * rendered from Markdown.
 *
 * The static generators all have versions of this but nothing for clean/simple/vanilla usage.
 */
import { visit } from 'unist-util-visit';
import path from 'path';

export default function (
  options = {
    sizes: {
      sm: '720w',
      md: '1280w',
      lg: '1920w',
    },
    fallback: true,
  },
) {
  return function (tree) {
    visit(tree, 'element', visitor);

    function visitor(node) {
      const {
        tagName,
        properties: { src, srcSet },
      } = node;

      if (tagName !== 'img' || typeof src !== 'string' || typeof srcSet !== 'undefined') {
        return;
      }

      const { dir, ext, name } = path.parse(src);
      const sizeCandidates = Object.keys(options.sizes).map((size) => {
        const imgSrc = path.join(dir, `${name}-${size}${ext}`);
        return `${imgSrc} ${options.sizes[size]}`;
      });

      // append our original source as the fallback/default candidate
      if (options.fallback) {
        sizeCandidates.push(path.join(dir, name + ext));
      }

      node.properties.srcSet = sizeCandidates.join(', ');
    }
  };
}
