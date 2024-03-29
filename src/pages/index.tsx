import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { DataProps } from '../global-types';
import filterDraftPosts from '../../lib/filter-draft-posts';

import Layout from '../components/layout';
import PostList from '../components/post-list';
import Seo from '../components/seo';

const BlogIndex = ({ data, location }: PageProps<DataProps>) => {
  const posts = data.allMarkdownRemark?.nodes || [];

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <p>No blog posts found.</p>
      </Layout>
    );
  }

  return (
    <Layout location={location}>
      <section>
        <VisuallyHidden elementType="h2">All Posts</VisuallyHidden>

        <PostList
          postsData={filterDraftPosts(posts).map(
            ({ frontmatter, fields, excerpt }) => ({
              slug: fields.slug,
              summary: fields.summaryHtml || excerpt,
              title: frontmatter?.title || 'Untitled',
              published:
                frontmatter?.published ||
                "Can't remember when this was published …",
              image: frontmatter?.cover,
            }),
          )}
        />
      </section>
    </Layout>
  );
};

export default BlogIndex;

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
          summaryHtml
        }
        frontmatter {
          published(formatString: "MMMM DD, YYYY")
          title
          summary
          cover {
            childImageSharp {
              gatsbyImageData(
                width: 320
                aspectRatio: 1.6
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`;
