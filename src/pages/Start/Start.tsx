import styles from "./Start.module.scss";
import Logo from "../../assets/logo.svg";

export const Start = () => {
  return (
    <div className={styles.start_panel}>
      <button className={styles.start_panel__button}>
        <Logo />
        Start
      </button>
    </div>
  );
};
