import { FC, Dispatch, SetStateAction, useRef, useEffect } from 'react'
import cn from 'classnames'

import styles from './Start.module.scss'
import win95 from '../../assets/win95Start.png'
import shutdown from '../../assets/shutdown.png'
import { useAction, useTypedSelector } from '../../hooks'
import { POWER_STATUS_OFF, POWER_STATUS_SHUTDOWN } from '../../utils'
import { DesktopData, StartIcon } from '../../model'

interface StartMenuProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  menuData: DesktopData[]
}

export const StartMenu: FC<StartMenuProps> = ({ setIsOpen, menuData }) => {
  const {
    setActiveWindow,
    setPowerStatus,
    setActiveStartIcon,
    clearActiveWindows,
  } = useAction()
  const { activeWindow } = useTypedSelector(state => state.app)

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

  const handleClick = (data: DesktopData) => {
    setActiveStartIcon(data.currentIcon)
    if (data.link?.length) window.open(data.link)
    else if (!activeWindow.some((el: StartIcon) => el.id === data.currentIcon))
      setActiveWindow({ id: data.currentIcon, label: data.label })
    setIsOpen(false)
  }
  return (
    <div className={styles.start_menu} ref={startMenuRef}>
      <div className={styles.start_menu__logo}>
        <img src={win95} alt='win95' className={styles.logo} />
      </div>
      <nav className={styles.start_menu__nav}>
        <ul className={styles.nav__list}>
          {menuData.map((data: DesktopData) => (
            <li
              key={data.currentIcon}
              className={styles.nav__list_item}
              onClick={() => handleClick(data)}
            >
              <img className={styles.icon} src={data.icon} alt='desctopIcon' />
              <p className={styles.label}>{data.label}</p>
            </li>
          ))}
          <li
            className={cn(styles.nav__list_item, styles.nav__list_shutdown)}
            onClick={() => {
              setTimeout(() => {
                setPowerStatus(POWER_STATUS_OFF)
              }, 2000)
              setPowerStatus(POWER_STATUS_SHUTDOWN)
              clearActiveWindows()
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
