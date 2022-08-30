import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData, getSrc } from 'gatsby-plugin-image';
import * as React from 'react';

export type SeoProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  socialImage?: IGatsbyImageData;
};

const Seo = ({ description, title, children, socialImage }: SeoProps) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;
  const srcImage = socialImage ? getSrc(socialImage) : null;
  const imageUrl = site.siteMetadata?.siteUrl + srcImage || null;

  const defaultSocialImageUrl =
    site.siteMetadata?.siteUrl + '/images/social-card.jpg';

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      {imageUrl && <meta name="og:image" content={imageUrl} />}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="phillipluther" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {!imageUrl && (
        <>
          <meta name="og:image" content={defaultSocialImageUrl} />
          <meta name="twitter:image" content={defaultSocialImageUrl} />
        </>
      )}
      {children}
    </>
  );
};

export default Seo;
