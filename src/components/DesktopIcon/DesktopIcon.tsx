import classNames from "classnames";
import { FC, MouseEvent, useState } from "react";
import styles from "./DesktopIcon.module.scss";

interface DesktopIconProps {
  label: string;
  icon: any;
}

export const DesktopIcon: FC<DesktopIconProps> = ({ label, icon }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleIconClick = (e: MouseEvent<HTMLElement>) => {
    switch (e.detail) {
      case 1:
        setIsClicked(true);
        break;
      case 2:
        setIsClicked(false);
        break;
      default:
        return;
    }
  };
  return (
    <div
      className={classNames(styles.container, {
        [styles.clicked]: isClicked,
      })}
      onClick={handleIconClick}
    >
      <img className={styles.icon} src={icon} alt="desctopIcon" />
      <p className={styles.label}>{label}</p>
    </div>
  );
};
