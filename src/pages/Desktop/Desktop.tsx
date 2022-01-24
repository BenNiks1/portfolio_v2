import { FC } from "react";
import { Start } from "..";
import styles from "./Desktop.module.scss";

export const Desktop: FC = () => {
  return (
    <main className={styles.windows}>
      <div className={styles.windows__desktop}> </div>
      <div className={styles.windows__start}>
        <Start />
      </div>
    </main>
  );
};
