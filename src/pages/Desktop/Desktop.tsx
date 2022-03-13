import { FC } from "react";
import { DesktopIcon, Start, Window } from "../../components";

import styles from "./Desktop.module.scss";
import computer from "../../assets/computer.png";
import { useAction } from "../../hooks";
import { COMPUTER_ICON } from "../../utils";

export const Desktop: FC = () => {
  const { setActiveIcon } = useAction();
  const onDesktopClick = () => {
    setActiveIcon(0);
  };
  return (
    <main className={styles.windows}>
      <div className={styles.windows__desktop} onClick={onDesktopClick}>
        {/* TODO: сделать fake rest api и прокинуть через map */}
        <DesktopIcon
          icon={computer}
          label={"My Computer"}
          currentIcon={COMPUTER_ICON}
        />
        <DesktopIcon icon={computer} label={"My Computer"} currentIcon={2} />
      </div>
      <div className={styles.windows__start}>
        <Start />
      </div>
    </main>
  );
};
