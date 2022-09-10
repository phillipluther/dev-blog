import * as React from 'react';

import Layout from '../components/layout';
import PageHeader from '../components/page-header';
import Seo from '../components/seo';
import TextBlock from '../components/text-block';

const pageTitle = "What's All This, Then?";
const pageDescription =
  "Phillip Luther's Frontend Engineering Blog is a blog about frontend engineering written by someone named Phillip Luther. It's not just a clever name. ";

const AboutPage = ({ location }) => (
  <Layout location={location}>
    <PageHeader title={pageTitle} summary={pageDescription} />
    <TextBlock as="section">
      <h2>About the Blog</h2>
      <p>
        If the pithy summary didn't do it for you, here's a longer, likely more
        helpful answer: this blog is about building web applications. It's about{' '}
        <em>all</em> aspects of building web applications and goes beyond the
        technical bits and how-tos.
      </p>
      <p>
        Assuredly, you'll get some technical bits and how-tos. You'll also get
        some why-shoulds, where-woulds, and what-ifs. Popular topics include
        developer experience, engineering culture, and the good and ill of
        industry standards. The blog often explores ethics and responsibility in
        application engineering, too.
      </p>
      <p>
        As such, consider this fair warning that some things might come off as
        finger-waggy. Despite the obtuse name, Phillip Luther's Frontend
        Engineering Blog is some dude's personal blog. It's editorial, not
        journalism.
      </p>

      <p>Oh, and speaking of "some dude" …</p>

      <h2>About the Author</h2>
      <p>
        My name is Phillip Luther. I go by Phil. I'm the creator of and sole
        contributor to Phillip Luther's Frontend Engineering Blog. Any
        references to "I" or "me" on Phillip Luther's Frontend Engineering Blog
        refer to Phillip Luther. Who goes by Phil. And who is the creator of and
        sole contributor to Phillip Luther's Frontend Engineering Blog.
      </p>
      <p>
        Semi-related, bios are hard. Each post sports an "About the Author"
        blurb, though. Those'll have to do for now and I'll commit to building
        out this page as the blog grows.
      </p>
    </TextBlock>
  </Layout>
);

export const Head = () => (
  <Seo title={pageTitle} description={pageDescription} />
);

export default AboutPage;
