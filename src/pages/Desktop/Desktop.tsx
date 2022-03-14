import { FC } from "react";
import { DesktopIcon, Start } from "../../components";
import { useQuery } from "react-query";
import styles from "./Desktop.module.scss";
import { useAction } from "../../hooks";
import { getDesktopData } from "../../api";

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
  console.log("res", response);
  const { setActiveIcon } = useAction();
  const onDesktopClick = () => {
    setActiveIcon(0);
  };
  if (isLoading) return <></>;
  return (
    <main className={styles.windows}>
      <div className={styles.windows__desktop} onClick={onDesktopClick}>
        {/* TODO: сделать fake rest api и прокинуть через map */}
        {/* @ts-ignore */}
        {response.data.map((iconData) => (
          <DesktopIcon
            icon={iconData.icon}
            label={iconData.label}
            currentIcon={iconData.currentIcon}
          />
        ))}
        {/* <DesktopIcon icon={computer} label={"My Computer"} currentIcon={2} /> */}
      </div>
      <div className={styles.windows__start}>
        <Start />
      </div>
    </main>
  );
};
