import { FC } from "react";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";
import { useAction } from "../../hooks";
import styles from "./Window.module.scss";
import Draggable from "react-draggable";
import cn from "classnames";
import { WindowData } from "../../model";

interface WindowProps {
  currentWindow: number;
  label: string;
  windowData: WindowData;
}

export const Window: FC<WindowProps> = ({
  currentWindow,
  windowData,
  label,
}) => {
  const { setActiveWindow } = useAction();
  const onClose = () => {
    setActiveWindow(currentWindow);
  };
  return (
    <Draggable
      handle=".window__header"
      bounds=".desktop"
      defaultPosition={{ x: 400, y: 400 }}
    >
      <div className={styles.window} style={{ position: "absolute" }}>
        <header className={cn(styles.window_header, "window__header")}>
          <p className={styles.window_header__title}>{label}</p>
          <div className={styles.window_header__buttons}>
            <button className={styles.window_header__button}>
              <span className={styles.minimize_icon} />
            </button>
            <button className={styles.window_header__button}>
              <span className={styles.expand_icon} />
            </button>

            <button className={styles.window_header__button} onClick={onClose}>
              <CloseIcon
                viewBox="0 0 460.775 460.775"
                className={styles.close_icon}
              />
            </button>
          </div>
        </header>
        <main className={styles.window_content}>
          <h2>{windowData.title}</h2>
          <p>{windowData.text}</p>
        </main>
      </div>
    </Draggable>
  );
};
