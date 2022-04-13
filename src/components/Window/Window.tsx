import { FC, MouseEvent, useEffect, useState } from 'react'
import { ReactComponent as CloseIcon } from '../../assets/closeIcon.svg'
import { useAction, useTypedSelector } from '../../hooks'
import styles from './Window.module.scss'
import Draggable from 'react-draggable'
import cn from 'classnames'
import { Position, WindowData } from '../../model'

interface WindowProps {
  currentWindow: number
  label: string
  windowData: WindowData
}

export const Window: FC<WindowProps> = ({
  currentWindow,
  windowData,
  label,
}) => {
  const [initialPosition, setInitialPosition] = useState<Position | null>(null)
  const {
    setActiveWindow,
    setActiveStartIcon,
    setMinimizeWindow,
    setActiveIcon,
    setExpandWindow,
  } = useAction()
  const { activeStartIcon, minimizeWindow, expandWindow } = useTypedSelector(
    state => state.app
  )
  const onClose = () => {
    setActiveWindow({ id: currentWindow, label: windowData.title })
    expandWindow.includes(currentWindow) && setExpandWindow(currentWindow)
  }
  const onWindowClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setActiveStartIcon(currentWindow)
  }

  const onMinimize = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setMinimizeWindow(currentWindow)
    setActiveIcon(0)
    setActiveStartIcon(0)
  }

  useEffect(() => {
    if (expandWindow.includes(currentWindow)) {
      setInitialPosition({ x: 0, y: 0 })
    } else {
      setInitialPosition(null)
    }
  }, [expandWindow])

  return (
    <Draggable
      handle='.window__header'
      bounds='.desktop'
      // @ts-ignore
      position={initialPosition}
      defaultPosition={{ x: 300, y: 300 }}
    >
      <div
        className={cn(styles.window, {
          [styles.active]: currentWindow === activeStartIcon,
          [styles.expand]: expandWindow.includes(currentWindow),
        })}
        style={{
          display: minimizeWindow.includes(currentWindow) ? 'none' : 'block',
        }}
        onClick={onWindowClick}
      >
        {/* TODO: вынести в отдельный компонент WindowHeader */}
        <header className={cn(styles.window_header, 'window__header')}>
          <p className={styles.window_header__title}>{label}</p>
          <div className={styles.window_header__buttons}>
            <button
              className={styles.window_header__button}
              onClick={onMinimize}
            >
              <span className={styles.minimize_icon} />
            </button>
            <button
              className={styles.window_header__button}
              onClick={() => setExpandWindow(currentWindow)}
            >
              <span className={styles.expand_icon} />
            </button>

            <button className={styles.window_header__button} onClick={onClose}>
              <CloseIcon
                viewBox='0 0 460.775 460.775'
                className={styles.close_icon}
              />
            </button>
          </div>
        </header>
        <main className={styles.window_content}>
          <h2>{windowData.title}</h2>
          <p>{windowData.text}</p>
        </main>
      </div>
    </Draggable>
  )
}
