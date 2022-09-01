export type PostType = {
  title: string;
  summary?: string;
  published: date;
  cover_alt?: string;
  cover_credit?: string;
  cover_credit_link?: string;
  slug?: string;
  tags?: string[];
  keywords?: string[];
  series?: string;
};

export type DataProps = {
  site?: {
    siteMetadata?: {
      title?: string;
      author?: string;
      description?: string;
      siteUrl?: string;
    };
  };
  allMarkdownRemark: {
    nodes: {
      frontmatter?: PostType;
      fields: {
        slug: string;
      };
      excerpt: string;
    }[];
    [key: string]: unknown;
  };
};
