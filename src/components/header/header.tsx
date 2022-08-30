import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import Container from '../container';
import DisplayFont from '../display-font';
import * as styles from './header.module.css';

export type HeaderProps = {
  isHome?: boolean;
  className?: string;
};

const Header = ({ isHome = false, className, ...props }: HeaderProps) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  );

  return (
    <Container as="header" className={styles.wrapper} {...props}>
      <DisplayFont as={isHome ? 'h1' : 'p'} className={styles.title}>
        <Link to="/">{site.siteMetadata.title}</Link>
      </DisplayFont>
    </Container>
  );
};

export default Header;
