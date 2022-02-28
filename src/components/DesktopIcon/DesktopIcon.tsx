import { FC } from "react";
import styles from "./DesktopIcon.module.scss";

interface DesktopIconProps {
  label: string;
  icon: any;
}

export const DesktopIcon: FC<DesktopIconProps> = ({ label, icon }) => {
  return (
    <div className={styles.container}>
      <img className={styles.icon} src={icon} alt="desctopIcon" />
      <p className={styles.label}>{label}</p>
    </div>
  );
};
