import * as React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import { DataProps } from '../global';

import Layout from '../components/layout';
import Seo from '../components/seo';
import PostSummary from '../components/post-summary';

const BlogIndex = ({ data, location }: PageProps<DataProps>) => {
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location}>
      <ol>
        {posts.map((post) => {
          const title = post.frontmatter?.title || post.fields.slug;
          const summaryProps = {
            title,
            excerpt: post.frontmatter?.summary || post.excerpt,
            slug: post.fields.slug,
            published: post.frontmatter?.published,
            // image
          };

          return (
            <li key={post.fields.slug}>
              <PostSummary {...summaryProps} />
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___published], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          published(formatString: "MMMM DD, YYYY")
          title
          summary
        }
      }
    }
  }
`;
