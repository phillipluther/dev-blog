import * as React from 'react';

import Layout from '../components/layout';
import PageHeader from '../components/page-header';
import Seo from '../components/seo';
import TextBlock from '../components/text-block';

const pageTitle = 'Contact';
const pageDescription =
  'Have a question about the blog? Need to contact me — Phil, the author — about something? Found a serious piece of wonk? Please reach out!';

const ContactPage = ({ location }) => (
  <Layout location={location}>
    <PageHeader title={pageTitle} summary={pageDescription} />
    <TextBlock as="section" className="mx-auto">
      <h2>By Email</h2>
      <p>
        Email's the best way to get in touch with me because I'm old-fashioned
        like that. Drop a line to{' '}
        <a href="mailto:dev@phillipluther.com">dev@phillipluther.com</a>.
      </p>

      <h2>On Twitter</h2>
      <p>
        I have a Twitter account that I infrequently frequent. A thoughtful
        message to{' '}
        <a href="https://twitter.com/phillipluther">@phillipluther</a> will
        eventually find its way to me.
      </p>
    </TextBlock>
  </Layout>
);

export const Head = () => (
  <Seo title={pageTitle} description={pageDescription} />
);

export default ContactPage;
