import { FC } from "react";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";
import { useAction } from "../../hooks";
import styles from "./Window.module.scss";

interface WindowProps {
  currentWindow: number;
}

export const Window: FC<WindowProps> = ({ currentWindow }) => {
  const { setActiveWindow } = useAction();
  const onClose = () => {
    setActiveWindow(currentWindow);
  };
  return (
    <div className={styles.window}>
      <header className={styles.window_header}>
        <p className={styles.window_header__title}>folder name</p>
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
      <main className={styles.window_content}>asdasdasdasd</main>
    </div>
  );
};
