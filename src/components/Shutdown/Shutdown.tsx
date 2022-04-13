import styles from './Shutdown.module.scss'
import logo from '../../assets/shutdownLogo.png'
import title from '../../assets/shutdownTitle.png'

export const Shutdown = () => (
  <main className={styles.shutdown}>
    <div className={styles.shutdown__wrapper}>
      <div className={styles.shutdown__logo}>
        <img src={logo} alt='logo' className={styles.logo} />
        <img src={title} alt='title' className={styles.title} />
      </div>
      <div className={styles.shutdown__loader} />
    </div>
  </main>
)
