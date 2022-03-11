import classNames from "classnames";
import { FC, MouseEvent } from "react";
import { useAction, useTypedSelector } from "../../hooks";
import styles from "./DesktopIcon.module.scss";

interface DesktopIconProps {
  label: string;
  icon: string;
  activeWindow: number;
}

export const DesktopIcon: FC<DesktopIconProps> = ({
  label,
  icon,
  activeWindow,
}) => {
  const { setActiveWindow, setClickedIcon } = useAction();
  const { isIconClicked } = useTypedSelector((state) => state.app);
  const handleIconClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    switch (e.detail) {
      case 1:
        setClickedIcon(true);
        break;
      case 2:
        setActiveWindow(activeWindow);
        setClickedIcon(false);
        break;
      default:
        return;
    }
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.clicked]: isIconClicked,
      })}
      onClick={handleIconClick}
    >
      <img className={styles.icon} src={icon} alt="desctopIcon" />
      <p className={styles.label}>{label}</p>
    </div>
  );
};
