import { FC, MouseEvent, TouchEvent } from 'react'
import { useAction, useTypedSelector } from '../../../../hooks'
import styles from '../../Window.module.scss'
import { ReactComponent as CloseIcon } from '../../../../assets/closeIcon.svg'
import cn from 'classnames'
import { WindowData } from '../../../../model'

interface WindowHeaderProps {
  currentIcon: number
  label: string
  windowData?: WindowData
}

export const WindowHeader: FC<WindowHeaderProps> = ({
  currentIcon,
  label,
  windowData,
}) => {
  const {
    setActiveWindow,
    setActiveStartIcon,
    setMinimizeWindow,
    setActiveIcon,
    setExpandWindow,
  } = useAction()
  const { expandWindow } = useTypedSelector(state => state.app)
  const onClose = () => {
    setActiveWindow({ id: currentIcon, label: windowData?.title as string })
    expandWindow.includes(currentIcon) && setExpandWindow(currentIcon)
  }
  const onMinimize = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation()
    setMinimizeWindow(currentIcon)
    setActiveIcon(0)
    setActiveStartIcon(0)
  }

  return (
    <header className={cn(styles.window_header, 'window__header')}>
      <p className={styles.window_header__title}>{label}</p>
      <div className={styles.window_header__buttons}>
        <button
          className={styles.window_header__button}
          onClick={onMinimize}
          onTouchStart={onMinimize}
        >
          <span className={styles.minimize_icon} />
        </button>
        <button
          disabled={windowData?.isGame}
          className={cn(styles.window_header__button, {
            [styles.window_header__button_disabled]: windowData?.isGame,
          })}
          onClick={() => setExpandWindow(currentIcon)}
          onTouchStart={() => setExpandWindow(currentIcon)}
        >
          <span className={styles.expand_icon} />
        </button>

        <button
          className={styles.window_header__button}
          onClick={onClose}
          onTouchStart={onClose}
        >
          <CloseIcon
            viewBox='0 0 460.775 460.775'
            className={styles.close_icon}
          />
        </button>
      </div>
    </header>
  )
}
