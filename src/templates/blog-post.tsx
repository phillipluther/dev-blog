import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { PostDataProps } from '../global-types';

import Layout from '../components/layout';
import PageHeader from '../components/page-header';
import PostSuggestions from '../components/post-suggestions';
import Seo from '../components/seo';
import TextBlock from '../components/text-block';
import Bio from '../components/bio';
import Divider from '../components/divider';

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}: PageProps<PostDataProps>) => {
  const siteTitle = site?.siteMetadata?.title || `Title`;
  const suggestedPosts = [];

  if (previous) {
    suggestedPosts.push({
      previous: true,
      ...previous,
    });
  }

  if (next) {
    suggestedPosts.push({
      next: true,
      ...next,
    });
  }

  return (
    <Layout location={location}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <PageHeader
          title={post.frontmatter?.title || siteTitle}
          published={post.frontmatter?.published}
          summary={post.excerpt}
          image={post.frontmatter?.cover}
        />
        <TextBlock
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <Divider />

        <footer>
          <PostSuggestions posts={suggestedPosts} />

          <Divider />

          <Bio />
        </footer>
      </article>
    </Layout>
  );
};

export const Head = ({
  data: { markdownRemark: post },
}: {
  data: { markdownRemark: PostDataProps['markdownRemark'] };
}) => {
  return (
    <Seo
      title={post.frontmatter?.title || 'Title'}
      description={post.excerpt}
    />
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(format: HTML)
      html
      frontmatter {
        title
        published(formatString: "MMMM DD, YYYY")
        cover {
          childImageSharp {
            gatsbyImageData(width: 720, aspectRatio: 1.6, placeholder: BLURRED)
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        cover {
          childImageSharp {
            gatsbyImageData(width: 88, aspectRatio: 1.6, placeholder: BLURRED)
          }
        }
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        cover {
          childImageSharp {
            gatsbyImageData(width: 88, aspectRatio: 1.6, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
