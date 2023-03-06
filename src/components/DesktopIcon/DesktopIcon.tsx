import cn from 'classnames'
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
  hasChildren?: boolean
  windowData?: WindowData
  link?: string
  x?: number
  y?: number
}

export const DesktopIcon: FC<DesktopIconProps> = props => {
  const { currentIcon, link, icon } = props

  const { setActiveWindow, setActiveIcon, setActiveStartIcon } = useAction()
  const { activeWindow, activeIcon } = useTypedSelector(state => state.app)

  const onOpenWindow = () => {
    setActiveIcon(0)
    setActiveStartIcon(currentIcon)
    if (link?.length) window.open(link)
    else if (!activeWindow.some((el: StartIcon) => el.id === currentIcon))
      setActiveWindow({ id: currentIcon, label: props.label })
  }

  const handleIconClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    switch (e.detail) {
      case 1:
        setActiveIcon(currentIcon)
        break
      case 2:
        onOpenWindow()
        break
      default:
        return
    }
  }
  return (
    <>
      <div
        className={cn(styles.container, {
          [styles.clicked]: currentIcon === activeIcon,
          [styles.children_icon]: link && props.windowData,
        })}
        onClick={handleIconClick}
        onTouchStart={onOpenWindow}
      >
        <img className={styles.icon} src={icon} alt='desctopIcon' />
        <p className={styles.label}>{props.label}</p>
      </div>
      {activeWindow.find((el: StartIcon) => el.id === currentIcon) && (
        <Window {...props} />
      )}
    </>
  )
}
