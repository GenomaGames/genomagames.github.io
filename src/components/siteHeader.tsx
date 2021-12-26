import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import {
  container,
  nav,
  navItem,
  navList,
  siteHeader,
} from "./siteHeader.module.css";

interface HeaderNavItemProps {
  isActive?: boolean;
  name: string;
  to: string;
}

interface HeaderProps {
  navItems: HeaderNavItemProps[];
  homeUrl: string;
  title: string;
}

const HeaderNavItem: React.FunctionComponent<HeaderNavItemProps> = (props) => {
  const { to, name, isActive } = props;

  return (
    <li className={navItem}>
      <Link to={to} className={isActive ? "active" : ""}>
        {name}
      </Link>
    </li>
  );
};

const SiteHeader: React.FunctionComponent<HeaderProps> = (props) => {
  const { title, homeUrl, navItems } = props;

  return (
    <header className={siteHeader}>
      <div className={container}>
        <h1>
          <Link to={homeUrl}>
            <StaticImage
              src="../assets/icon.png"
              alt="Genoma Games' logo"
              height={32}
              placeholder="blurred"
            ></StaticImage>
            <span>{title}</span>
          </Link>
        </h1>
        <nav className={nav}>
          <ul className={navList}>
            {navItems.map((navItem) => (
              <HeaderNavItem key={navItem.name} {...navItem} />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
