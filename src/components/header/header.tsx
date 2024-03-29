import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Container from '../container';
import Logo from '../logo';

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

  const TitleTag = isHome ? 'h1' : 'p';
  return (
    <Container as="header" className={styles.wrapper} {...props}>
      <TitleTag className={styles.title}>
        <Link to="/">
          <Logo />
        </Link>
      </TitleTag>
    </Container>
  );
};

export default Header;
