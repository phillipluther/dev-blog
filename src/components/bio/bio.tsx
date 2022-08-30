import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Container from '../container';

const Bio = () => {
  return (
    <Container as="aside">
      <h2>About the Author</h2>

      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={['auto', 'webp', 'avif']}
        src="../../images/portrait-avatar.png"
        width={50}
        height={50}
        quality={70}
        alt="Profile picture"
      />

      <p> My name is Phillip Luther. I go by Phil.</p>

      <p>
        I'm a life-long<sup>*</sup> software engineer and classically trained
        musician. I'm also the creator of and sole contributor to this very
        blog.
      </p>

      <p>
        Blog-relevant areas of current interest include the web audio API,
        non-crypto blockchain technology, and legislative overreactions to dark
        patterns.
      </p>

      <p>
        Blog-irrelevant areas of current interest include sci-fi/fantasy across
        most mediums, micro-optimizing my living space, and constantly
        fluctuating on whether I'm a mountain person or an ocean person.
      </p>

      <p className="text-sm text-brando-600">
        <sup>*</sup> I'm just over 40. Accounting for childhood and teenage
        buffoonery I'll translate "life long" to 20'ish years. Throwing that out
        for clarity.
      </p>
    </Container>
  );
};

export default Bio;
