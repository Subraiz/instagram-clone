import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import styles from "./styles.module.css";

const Header = (props) => {
  return (
    <div className={styles.headerContainer}>
      <IoCameraOutline className={[styles.icon, styles.camera].join(" ")} />
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
        }
        alt="logo"
        className={styles.logo}
      />
      <FiSend className={[styles.icon, styles.send].join(" ")} />
    </div>
  );
};

export { Header };
