import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Container from '../container';
import DisplayFont from '../display-font';
import TextBlock from '../text-block';
import * as styles from './bio.module.css';

const Bio = () => {
  return (
    <TextBlock as="aside" className={styles.wrapper}>
      <DisplayFont as="h2" size="md">
        About the Author
      </DisplayFont>

      <StaticImage
        className={styles.avatar}
        formats={['auto', 'webp', 'avif']}
        src="../../images/portrait-avatar.png"
        quality={60}
        alt="Phillip Luther's author profile picture"
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

      <p className={styles.finePrint}>
        <sup>*</sup> I'm just over 40. Accounting for childhood and teenage
        buffoonery I'll translate "life long" to 20'ish years. Throwing that out
        for clarity.
      </p>
    </TextBlock>
  );
};

export default Bio;
