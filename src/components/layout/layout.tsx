import * as React from 'react';
import { Link } from 'gatsby';
import Container from '../container';
import Footer from '../footer';
import * as styles from './layout.module.css';

const Layout = ({ location, title, children }) => {
  /* @ts-ignore */
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    );
  }

  return (
    <Container
      noX
      noY
      className={styles.wrapper}
      data-is-root-path={isRootPath}
    >
      <Container as="header">{header}</Container>
      <main>{children}</main>
      <Footer />
    </Container>
  );
};

export default Layout;
