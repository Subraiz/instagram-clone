import React from "react";
import { VscHome } from "react-icons/vsc";
import { BsSearch, BsPlusSquare, BsHeart } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import styles from "./styles.module.css";

const NavBar = (props) => {
  const Icons = [VscHome, BsSearch, BsPlusSquare, BsHeart, FiUser];

  const renderNavigation = () => {
    return Icons.map((icon, i) => {
      const Icon = icon;
      const iconClasses =
        i === 0 ? [styles.icon, styles.home].join(" ") : styles.icon;
      return (
        <Icon
          key={i}
          className={iconClasses}
          onClick={() => props.switchScreen(i)}
        />
      );
    });
  };

  return <div className={styles.navbarContainer}>{renderNavigation()}</div>;
};

export { NavBar };
