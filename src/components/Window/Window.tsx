import { FC, MouseEvent, TouchEvent, useEffect, useState } from 'react'
import { useAction, useTypedSelector } from '../../hooks'
import styles from './Window.module.scss'
import Draggable from 'react-draggable'
import cn from 'classnames'
import { DesktopData, Position, WindowData } from '../../model'
import { WindowHeader } from './components'
import { DesktopIcon } from '../DesktopIcon'
import { Game } from '../Game'

interface WindowProps {
  currentIcon: number
  label: string
  hasChildren?: boolean
  windowData?: WindowData
  x?: number
  y?: number
}

export const Window: FC<WindowProps> = props => {
  const { currentIcon, windowData, hasChildren } = props

  const [initialPosition, setInitialPosition] = useState<Position | null>(null)
  const { setActiveStartIcon } = useAction()
  const { activeStartIcon, minimizeWindow, expandWindow } = useTypedSelector(
    state => state.app
  )
  const onWindowClick = (
    e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>
  ) => {
    e.stopPropagation()
    setActiveStartIcon(currentIcon)
  }

  useEffect(() => {
    if (expandWindow.includes(currentIcon)) {
      setInitialPosition({ x: 0, y: 0 })
    } else {
      setInitialPosition(null)
    }
  }, [expandWindow])

  return (
    // @ts-expect-error
    <Draggable
      handle='.window__header'
      bounds='.desktop'
      position={initialPosition}
      defaultPosition={{ x: props.x, y: props.y }}
    >
      <div
        className={cn(styles.window, {
          [styles.active]: currentIcon === activeStartIcon,
          [styles.expand]: expandWindow.includes(currentIcon),
          [styles.game]: windowData?.isGame,
        })}
        style={{
          display: minimizeWindow.includes(currentIcon) ? 'none' : 'block',
        }}
        onMouseDown={onWindowClick}
        onTouchStart={onWindowClick}
      >
        <WindowHeader {...props} />
        <main className={styles.window_content}>
          {hasChildren ? (
            <DesktopIcon {...(windowData as DesktopData)} />
          ) : windowData?.isGame ? (
            <Game />
          ) : (
            <>
              <h2>{windowData?.title}</h2>
              {/* @ts-expect-error */}
              <div dangerouslySetInnerHTML={{ __html: windowData?.text }} />
            </>
          )}
        </main>
      </div>
    </Draggable>
  )
}
