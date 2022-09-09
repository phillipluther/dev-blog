import { IGatsbyImageData } from 'gatsby-plugin-image';

export type PostType = {
  title: string;
  summary?: string;
  published: date;
  cover?: IGatsbyImageData;
  cover_alt?: string;
  cover_credit?: string;
  cover_credit_link?: string;
  slug?: string;
  tags?: string[];
  keywords?: string[];
  series?: string;
};

export type SiteMetadataProps = {
  title?: string;
  author?: string;
  description?: string;
  siteUrl?: string;
};

export type MarkdownRemarkNodeProps = {
  id?: string;
  frontmatter?: PostType;
  fields: {
    slug: string;
    summaryHtml: string;
  };
  excerpt: string;
};

export type DataProps = {
  site?: {
    siteMetadata?: SiteMetadataProps;
  };
  allMarkdownRemark?: {
    nodes: MarkdownRemarkNodeProps[];
    [key: string]: unknown;
  };
};

export type SuggestedPostDataProps = {
  previous?: boolean;
  next?: boolean;
  fields: {
    slug: string;
    summaryHtml?: string;
  };
  frontmatter: {
    title: string;
    cover?: IGatsbyImageData;
  };
};

export type PostDataProps = {
  site: {
    siteMetadata?: SiteMetadataProps;
  };
  markdownRemark: {
    id: string;
    excerpt: string;
    html: string;
    frontmatter?: PostType;
  };
  previous: SuggestedPostDataProps;
  next: SuggestedPostDataProps;
};
