import * as React from 'react';
import Container from '../container';
import Header from '../header';
import Footer from '../footer';
import * as styles from './layout.module.css';

export type LayoutProps = {
  children: React.ReactNode;
  location: { [key: string]: unknown };
  title: string;
};

const Layout = ({ location, title, children }: LayoutProps) => {
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
