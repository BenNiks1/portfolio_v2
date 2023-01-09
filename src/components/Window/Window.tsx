import { FC, MouseEvent, useEffect, useState } from 'react'
import { useAction, useTypedSelector } from '../../hooks'
import styles from './Window.module.scss'
import Draggable from 'react-draggable'
import cn from 'classnames'
import { Position, WindowData } from '../../model'
import { WindowHeader } from './components'
import { DesktopIcon } from '../DesktopIcon'

interface WindowProps {
  currentWindow: number
  label: string
  hasChildren?: boolean
  windowData?: WindowData
}

export const Window: FC<WindowProps> = ({
  currentWindow,
  windowData,
  label,
  hasChildren,
}) => {
  const [initialPosition, setInitialPosition] = useState<Position | null>(null)
  const { setActiveStartIcon } = useAction()
  const { activeStartIcon, minimizeWindow, expandWindow } = useTypedSelector(
    state => state.app
  )

  const onWindowClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setActiveStartIcon(currentWindow)
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
        <WindowHeader
          label={label}
          currentWindow={currentWindow}
          windowData={windowData}
        />
        <main className={styles.window_content}>
          {hasChildren ? (
            <DesktopIcon
              icon={windowData?.icon as string}
              label={windowData?.label as string}
              currentIcon={windowData?.currentIcon as number}
              windowData={windowData}
              link={windowData?.link}
            />
          ) : (
            <>
              <h2>{windowData?.title}</h2>
              <p>{windowData?.text}</p>
            </>
          )}
        </main>
      </div>
    </Draggable>
  )
}
