import styles from './Bios.module.scss'

export const Bios = () => (
  <main className={styles.bios}>
    <div className={styles.bios__wrapper}>
      BS BIOS (C) 2026 Bohdan Sychov. Initializing portfolio environment...
      Memory test: 640K OK. Loading desktop, experience, game.exe and Bytebeat
      Player. Press any key to boot{' '}
      <span className={styles.bios__underline}>_</span>
    </div>
  </main>
)
