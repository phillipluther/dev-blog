import * as React from 'react';
import { PageProps } from 'gatsby';
import Container from '../container';
import Header from '../header';
import Footer from '../footer';
import * as styles from './layout.module.css';

export type LayoutProps = {
  children: React.ReactNode;
  location: PageProps['location'];
};

const Layout = ({ location, children }: LayoutProps) => {
  /* @ts-ignore */
  const rootPath = `${__PATH_PREFIX__}/`;
  const isHome = location.pathname === rootPath;

  return (
    <Container noX noY className={styles.wrapper} data-is-root-path={isHome}>
      <Header isHome={isHome} />
      <Container as="main">{children}</Container>
      <Footer />
    </Container>
  );
};

export default Layout;
