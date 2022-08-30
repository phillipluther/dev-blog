import React from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import Container from '../container';
import TextBlock from '../text-block';
import * as styles from './footer.module.css';

const Footer = () => (
  <Container as="footer" className={styles.wrapper}>
    <VisuallyHidden elementType="h2">Site Footer</VisuallyHidden>

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
