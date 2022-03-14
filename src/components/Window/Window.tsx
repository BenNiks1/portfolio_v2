import { FC } from "react";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";
import { useAction } from "../../hooks";
import styles from "./Window.module.scss";
import Draggable from "react-draggable";
import cn from "classnames";

interface WindowProps {
  currentWindow: number;
}

export const Window: FC<WindowProps> = ({ currentWindow }) => {
  const { setActiveWindow } = useAction();
  const onClose = () => {
    setActiveWindow(currentWindow);
  };
  return (
    <Draggable handle=".window__header">
      <div className={styles.window}>
        <header className={cn(styles.window_header, "window__header")}>
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
    </Draggable>
  );
};

{
  /* <Draggable handle="strong">
          <div className="box no-cursor" style={{display: 'flex', flexDirection: 'column'}}>
            <strong className="cursor"><div>Drag here</div></strong>
            <div style={{overflow: 'scroll'}}>
              <div style={{background: 'yellow', whiteSpace: 'pre-wrap'}}>
                I have long scrollable content with a handle
                {'\n' + Array(40).fill('x').join('\n')}
              </div>
            </div>
          </div>
        </Draggable> */
}
