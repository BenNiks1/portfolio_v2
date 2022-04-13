import styles from './Bios.module.scss'

export const Bios = () => (
  <main className={styles.bios}>
    <div className={styles.bios__wrapper}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates neque,
      voluptate eos quibusdam quod reprehenderit explicabo eius, officiis
      dolorem aut culpa, esse nobis modi soluta{' '}
      <span className={styles.bios__underline}>_</span>
    </div>
  </main>
)
