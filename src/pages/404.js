import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import PageHeader from '../components/page-header';
import Seo from '../components/seo';
import TextBlock from '../components/text-block';

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <PageHeader
        title="Page Not Found"
        summary="The page you were looking for doesn't exist. Or … more accurately, it doesn't exist here."
      />

      <TextBlock>
        <p>
          Double-check the link you used to get here and see if it looks
          correct, then try again. You could also try jumping back to the blog's{' '}
          <Link to="/">home page</Link> and getting back on track from there.
        </p>

        <p>
          If you feel like you reached this page in error and something's truly
          borked, please <a href="mailto:dev@phillipluther.com">contact me</a>{' '}
          and let me know.
        </p>
      </TextBlock>
    </Layout>
  );
};

export const Head = () => <Seo title="404: Not Found" />;

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
