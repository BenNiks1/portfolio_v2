import { FC } from "react";
import { DesktopIcon, Start } from "../../components";

import styles from "./Desktop.module.scss";
import computer from "../../assets/computer.png";

export const Desktop: FC = () => {
  return (
    <main className={styles.windows}>
      <div className={styles.windows__desktop}>
        <DesktopIcon icon={computer} label={"My Computer"} />
      </div>
      <div className={styles.windows__start}>
        <Start />
      </div>
    </main>
  );
};
