import React from 'react';
import { Link } from 'gatsby';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import Container from '../container';
import TextBlock from '../text-block';
import DisplayFont from '../display-font';

import * as styles from './footer.module.css';

const Footer = () => (
  <Container as="footer" className={styles.wrapper}>
    <VisuallyHidden elementType="h2">Site Footer</VisuallyHidden>

    <TextBlock>
      <VisuallyHidden elementType="h3">Site Navigation</VisuallyHidden>

      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink}>
              <DisplayFont as="span">Home</DisplayFont>
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink}>
              <DisplayFont as="span">About</DisplayFont>
            </Link>
          </li>
          <li>
            <Link to="/contact" className={styles.navLink}>
              <DisplayFont as="span">Contact</DisplayFont>
            </Link>
          </li>
        </ul>
      </nav>
    </TextBlock>

    <TextBlock finePrint>
      <VisuallyHidden elementType="h3">
        Legal Information and Disclaimers
      </VisuallyHidden>
      <p>
        All blog content is Copyright &copy; {new Date().getFullYear()} by
        Phillip Luther unless otherwise specified.
      </p>
      <p>
        The opinions expressed on the blog belong to me, Phillip Luther, and do
        not necessarily reflect the views or opinions of any associated
        organizations or corporate entities.
      </p>
    </TextBlock>
  </Container>
);

export default Footer;
