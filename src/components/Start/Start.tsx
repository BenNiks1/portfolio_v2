import { FC, useState } from "react";
import styles from "./Start.module.scss";
import logo from "../../assets/logo.png";
import { StartMenu } from ".";
import cn from "classnames";
import { Clock } from "..";

export const Start: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.start_panel}>
      <div
        className={cn(styles.start_panel__button, {
          [styles.active]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={logo} alt="win" className={styles.start_panel__logo} />
        <span className={styles.start_panel__text}>Start</span>
      </div>
      <Clock />
      {isOpen && <StartMenu setIsOpen={setIsOpen} />}
    </div>
  );
};
