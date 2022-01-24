import { FC } from "react";

import styles from "./Start.module.scss";
import win95 from "../../assets/win95Start.png";

export const StartMenu: FC = () => {
  const lang = navigator.language;
  return (
    <div className={styles.start_menu}>
      <div className={styles.start_menu__logo}>
        <img src={win95} alt="win95" className={styles.logo} />
      </div>
      <nav className={styles.start_menu__nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__list_item}>{lang}</li>
          <li className={styles.nav__list_item}>asdasd</li>
          <li className={styles.nav__list_item}>asdasd</li>
          <li className={styles.nav__list_item}>asdasd</li>
          <li className={styles.nav__list_item}>asdasd</li>
        </ul>
      </nav>
    </div>
  );
};
