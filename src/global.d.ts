declare module '*.svg' {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export = value;
}

declare module '*.module.css' {
  const content: { [key: string]: string };
  export default content;
}

export type PostType = {
  title: string;
  description?: string;
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
