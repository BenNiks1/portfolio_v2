import classNames from 'classnames'
import { FC, MouseEvent } from 'react'
import { useAction, useTypedSelector } from '../../hooks'
import { WindowData } from '../../model'
import { StartIcon } from '../../model'
import { Window } from '../Window'
import styles from './DesktopIcon.module.scss'

interface DesktopIconProps {
  label: string
  icon: string
  currentIcon: number
  windowData: WindowData
}

export const DesktopIcon: FC<DesktopIconProps> = ({
  label,
  icon,
  currentIcon,
  windowData,
}) => {
  const { setActiveWindow, setActiveIcon, setActiveStartIcon } = useAction()
  const { activeWindow, activeIcon } = useTypedSelector(state => state.app)
  const handleIconClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    switch (e.detail) {
      case 1:
        setActiveIcon(currentIcon)
        break
      case 2:
        setActiveIcon(0)
        setActiveStartIcon(currentIcon)
        !activeWindow.some((el: StartIcon) => el.id === currentIcon) &&
          setActiveWindow({ id: currentIcon, label })
        break
      default:
        return
    }
  }

  return (
    <>
      <div
        className={classNames(styles.container, {
          [styles.clicked]: currentIcon === activeIcon,
        })}
        onClick={handleIconClick}
      >
        <img className={styles.icon} src={icon} alt='desctopIcon' />
        <p className={styles.label}>{label}</p>
      </div>
      {activeWindow.find((el: StartIcon) => el.id === currentIcon) && (
        <Window
          currentWindow={currentIcon}
          windowData={windowData}
          label={label}
        />
      )}
    </>
  )
}
