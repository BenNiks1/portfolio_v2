import { FC } from "react";
import { DesktopIcon, Start } from "../../components";

import styles from "./Desktop.module.scss";
import computer from "../../assets/computer.png";
import { useAction } from "../../hooks";
import { COMPUTER_ICON } from "../../utils";

export const Desktop: FC = () => {
  const { setClickedIcon } = useAction();
  const onDesktopClick = () => {
    setClickedIcon(false);
  };
  return (
    <main className={styles.windows}>
      <div className={styles.windows__desktop} onClick={onDesktopClick}>
        {/* TODO: сделать fake rest api и прокинуть через map */}
        <DesktopIcon
          icon={computer}
          label={"My Computer"}
          activeWindow={COMPUTER_ICON}
        />
      </div>
      <div className={styles.windows__start}>
        <Start />
      </div>
    </main>
  );
};
