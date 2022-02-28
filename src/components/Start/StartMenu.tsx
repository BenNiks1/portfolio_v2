import { FC, Dispatch, SetStateAction, useRef, useEffect } from "react";
import classNames from "classnames";

import styles from "./Start.module.scss";
import win95 from "../../assets/win95Start.png";
import shutdown from "../../assets/shutdown.png";

interface StartMenuProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const StartMenu: FC<StartMenuProps> = ({ setIsOpen }) => {
  const startMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [startMenuRef]);
  return (
    <div className={styles.start_menu} ref={startMenuRef}>
      <div className={styles.start_menu__logo}>
        <img src={win95} alt="win95" className={styles.logo} />
      </div>
      <nav className={styles.start_menu__nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__list_item}>asdasd</li>
          <li className={styles.nav__list_item}>asdasd</li>
          <li className={styles.nav__list_item}>asdasd</li>
          <li
            className={classNames(
              styles.nav__list_item,
              styles.nav__list_shutdown
            )}
            // TODO: Возможно понадобиться, если получится выключить вкладку по кнопке
            // onClick={() => {
            //   window.close();
            // }}
          >
            <img
              src={shutdown}
              alt="shutdown"
              className={styles.shutdown_icon}
            />
            <p>Shut Down</p>
          </li>
        </ul>
      </nav>
    </div>
  );
};
