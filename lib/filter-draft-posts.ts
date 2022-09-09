import type { MarkdownRemarkNodeProps } from '../src/global-types';

export default (posts: MarkdownRemarkNodeProps[]): MarkdownRemarkNodeProps[] =>
  posts.filter((post: MarkdownRemarkNodeProps) => {
    if (!post.frontmatter) {
      return false;
    }

    const { published } = post.frontmatter;
    return !!published;
  });
