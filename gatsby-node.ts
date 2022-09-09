import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import filterDraftPosts from './lib/filter-draft-posts';

export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___published], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              published
              summary
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    );
    return;
  }

  const posts = filterDraftPosts(result.data.allMarkdownRemark.nodes);

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: `/blog/${post.fields.slug}`,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }
};

export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  const slug = node.frontmatter?.slug;

  if (node.internal.type === `MarkdownRemark`) {
    const value = slug ? slug : createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });

    if (node.frontmatter.summary) {
      // make an HTML version (processed markdown)
    }
  }
};

export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type SiteSiteMetadata {
      title: String
      description: String
      author: String
      siteUrl: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      summary: String
      published: Date @dateformat
      cover_alt: String
      cover_credit: String
      cover_credit_link: String
      slug: String
      tags: [String]
      keywords: [String]
      series: String
    }

    type Fields {
      slug: String
      summaryHtml: String
    }
  `);
};
