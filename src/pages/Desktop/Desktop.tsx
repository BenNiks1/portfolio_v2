import { FC } from "react";
import { DesktopIcon, Start } from "../../components";
import { useQuery } from "react-query";
import styles from "./Desktop.module.scss";
import { useAction } from "../../hooks";
import { getDesktopData } from "../../api";
import cn from "classnames";
import { DesktopData } from "../../model";

export const Desktop: FC = () => {
  const { data: response, isLoading } = useQuery(
    "desktopData",
    async () => await getDesktopData(),
    {
      onError(error) {
        console.error(error);
      },
    }
  );
  const { setActiveIcon, setActiveStartIcon } = useAction();
  const onDesktopClick = () => {
    setActiveIcon(0);
    setActiveStartIcon(0);
  };
  if (isLoading) return <></>;
  return (
    <main className={styles.windows}>
      <div
        className={cn(styles.windows__desktop, "desktop")}
        onClick={onDesktopClick}
      >
        {response?.data.map((iconData: DesktopData) => (
          <DesktopIcon
            icon={iconData.icon}
            label={iconData.label}
            currentIcon={iconData.currentIcon}
            windowData={iconData.window}
          />
        ))}
      </div>
      <div className={styles.windows__start}>
        <Start />
      </div>
    </main>
  );
};
