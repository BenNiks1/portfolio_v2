import { FC, Dispatch, SetStateAction, useRef, useEffect } from 'react'
import cn from 'classnames'

import styles from './Start.module.scss'
import win95 from '../../assets/win95Start.png'
import shutdown from '../../assets/shutdown.png'
import { useAction } from '../../hooks'
import { POWER_STATUS_OFF, POWER_STATUS_SHUTDOWN } from '../../utils'

interface StartMenuProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const StartMenu: FC<StartMenuProps> = ({ setIsOpen }) => {
  const { setPowerStatus } = useAction()
  const startMenuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [startMenuRef])
  return (
    <div className={styles.start_menu} ref={startMenuRef}>
      <div className={styles.start_menu__logo}>
        <img src={win95} alt='win95' className={styles.logo} />
      </div>
      <nav className={styles.start_menu__nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__list_item}>asdasd</li>
          <li className={styles.nav__list_item}>asdasd</li>
          <li className={styles.nav__list_item}>asdasd</li>
          <li
            className={cn(styles.nav__list_item, styles.nav__list_shutdown)}
            onClick={() => {
              setTimeout(() => {
                setPowerStatus(POWER_STATUS_OFF)
              }, 2000)
              setPowerStatus(POWER_STATUS_SHUTDOWN)
            }}
          >
            <img
              src={shutdown}
              alt='shutdown'
              className={styles.shutdown_icon}
            />
            <p>Shut Down</p>
          </li>
        </ul>
      </nav>
    </div>
  )
}
