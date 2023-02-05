import styles from './Shutdown.module.scss'
import logo from '../../assets/shutdownLogo.png'
import title from '../../assets/shutdownTitle.png'

export const Shutdown = () => (
  <main className={styles.shutdown}>
    <div className={styles.shutdown__wrapper}>
      <div className={styles.shutdown__logo}>
        <picture>
          <source srcSet={logo} media='(max-width: 768px)' />
          <img className={styles.logo} src={logo} alt='logo' />
        </picture>

        <picture>
          <source srcSet={title} media='(max-width: 768px)' />
          <img className={styles.title} src={title} alt='logo' />
        </picture>
      </div>
      <div className={styles.shutdown__loader} />
    </div>
  </main>
)
