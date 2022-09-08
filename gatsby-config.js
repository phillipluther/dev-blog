require('dotenv').config({
  path: '.env',
});

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  console.log('\n[ Creating production build ]\n');
}

const siteMetadata = {
  title: "Phillip Luther's Frontend Engineering Blog",
  author: 'Phillip Luther',
  description:
    'A blog about building modern web applications with JavaScript, CSS, HTML; ethics in software engineering; and developer culture',
  siteUrl: 'https://phillipluther.dev',
};

const plugins = [
  `gatsby-plugin-image`,
  'gatsby-plugin-dts-css-modules',
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      excerpt_separator: '<!-- endexcerpt -->',
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 720,
            backgroundColor: 'transparent',
            linkImagesToOriginal: false,
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            noInlineHighlight: true,
          },
        },
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`,
      ],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /\.inline\.svg$/,
      },
    },
  },
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.nodes.map((node) => {
              return Object.assign({}, node.frontmatter, {
                description: node.frontmatter.summary || node.excerpt,
                date: node.frontmatter.published,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }],
              });
            });
          },
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___published] },
              ) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    summary
                    published
                  }
                }
              }
            }
          `,
          output: '/rss.xml',
          title: 'PhillipLuther.dev RSS Feed',
        },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Phillip Luther's Frontend Engineering Blog`,
      short_name: `Phil's Blog`,
      start_url: `/`,
      background_color: `#292929`,
      // This will impact how browsers show your PWA/website
      // https://css-tricks.com/meta-theme-color-and-trickery/
      // theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/favicon.png`, // This path is relative to the root of the site.
    },
  },
];

if (isProd) {
  plugins.push({
    resolve: 'gatsby-source-git',
    options: {
      name: 'dev-blog-content',
      remote: `https://phillipluther:${process.env.DEV_BLOG_CONTENT_TOKEN}@github.com/phillipluther/dev-blog-content.git`,
    },
  });
} else {
  plugins.push({
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content`,
      name: `blog`,
    },
  });
}

module.exports = {
  siteMetadata,
  plugins,
};
