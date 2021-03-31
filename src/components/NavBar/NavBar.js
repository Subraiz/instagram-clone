import React from "react";
import { VscHome } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { BsSearch, BsPlusSquare, BsHeart } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import styles from "./styles.module.css";

const NavBar = (props) => {
  const navItems = [
    { icon: VscHome, path: "/" },
    { icon: BsSearch, path: "/search" },
    { icon: BsPlusSquare, path: "/post" },
    { icon: BsHeart, path: "/notifications" },
    { icon: FiUser, path: "/profile" }
  ];

  const renderNavigation = () => {
    return navItems.map((item, i) => {
      const Icon = item.icon;
      const iconClasses =
        i === 0 ? [styles.icon, styles.home].join(" ") : styles.icon;
      return (
        <Link to={item.path} key={item.path} className={styles.link}>
          <Icon className={iconClasses} />
        </Link>
      );
    });
  };

  return (
    <div>
      <div className={styles.hiddenPadding} />
      <div className={styles.navbarContainer}>{renderNavigation()}</div>
    </div>
  );
};

export { NavBar };
