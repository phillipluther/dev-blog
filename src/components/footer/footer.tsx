import React from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import Container from '../container';

const Footer = () => (
  <Container as="footer">
    <VisuallyHidden elementType="h2">Site Footer</VisuallyHidden>

    <section>
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
    </section>
  </Container>
);

export default Footer;
