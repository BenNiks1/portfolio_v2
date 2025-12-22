import {
  FC,
  MouseEvent as ReactMouseEvent,
  TouchEvent,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react'
import { useAction, useTypedSelector } from '../../hooks'
import styles from './Window.module.scss'
import Draggable from 'react-draggable'
import cn from 'classnames'
import { DesktopData, Position, WindowData } from '../../model'
import { WindowHeader } from './components'
import { DesktopIcon } from '../DesktopIcon'
import { Game } from '../Game'
import { Settings } from '../Settings'
import { BytebeatPlayer } from '../BytebeatPlayer'

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

  const getInitialSize = () => {
    if (windowData?.isGame) {
      return { width: 1000, height: 600 }
    }
    return { width: 700, height: 500 }
  }

  const [initialPosition, setInitialPosition] = useState<Position | null>(null)
  const [size, setSize] = useState(getInitialSize())
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  const startSizeRef = useRef({ width: 0, height: 0 })
  const startPosRef = useRef({ x: 0, y: 0 })

  const { setActiveStartIcon } = useAction()
  const { activeStartIcon, minimizeWindow, expandWindow } = useTypedSelector(
    state => state.app
  )

  const onWindowClick = (
    e: ReactMouseEvent<HTMLElement> | TouchEvent<HTMLElement>
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

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleResizeStart = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>, direction: string) => {
      if (expandWindow.includes(currentIcon)) return
      e.preventDefault()
      e.stopPropagation()
      setIsResizing(true)
      setResizeDirection(direction)
      startSizeRef.current = { width: size.width, height: size.height }
      startPosRef.current = { x: e.clientX, y: e.clientY }
    },
    [expandWindow, currentIcon, size]
  )

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startPosRef.current.x
      const deltaY = e.clientY - startPosRef.current.y

      let newWidth = startSizeRef.current.width
      let newHeight = startSizeRef.current.height

      if (resizeDirection.includes('e')) {
        newWidth = Math.max(300, startSizeRef.current.width + deltaX)
      }
      if (resizeDirection.includes('s')) {
        newHeight = Math.max(200, startSizeRef.current.height + deltaY)
      }
      if (resizeDirection.includes('w')) {
        newWidth = Math.max(300, startSizeRef.current.width - deltaX)
      }
      if (resizeDirection.includes('n')) {
        newHeight = Math.max(200, startSizeRef.current.height - deltaY)
      }

      setSize({ width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeDirection('')
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, resizeDirection])

  const isExpanded = expandWindow.includes(currentIcon)
  const isMinimized = minimizeWindow.includes(currentIcon)

  return (
    // @ts-expect-error
    <Draggable
      handle='.window__header'
      bounds='.desktop'
      position={initialPosition}
      defaultPosition={{ x: props.x, y: props.y }}
      disabled={isExpanded}
    >
      <div
        ref={windowRef}
        className={cn(styles.window, {
          [styles.active]: currentIcon === activeStartIcon,
          [styles.expand]: isExpanded,
          [styles.game]: windowData?.isGame,
          [styles.animating]: isAnimating,
          [styles.minimizing]: isMinimized,
        })}
        style={{
          display: isMinimized ? 'none' : 'block',
          width: isExpanded ? '100%' : `${size.width}px`,
          height: isExpanded ? 'calc(100% - 38px)' : `${size.height}px`,
        }}
        onClick={onWindowClick}
        onTouchStart={onWindowClick}
      >
        <WindowHeader {...props} />
        <main className={styles.window_content}>
          {hasChildren ? (
            <DesktopIcon {...(windowData as DesktopData)} />
          ) : windowData?.isGame ? (
            <Game />
          ) : windowData?.isSettings ? (
            <Settings />
          ) : windowData?.isBytebeat ? (
            <BytebeatPlayer />
          ) : (
            <>
              <h2>{windowData?.title}</h2>
              {/* @ts-expect-error */}
              <div dangerouslySetInnerHTML={{ __html: windowData?.text }} />
            </>
          )}
        </main>

        {/* Resize handles */}
        {!isExpanded && (
          <>
            <div
              className={cn(styles.resize_handle, styles.resize_n)}
              onMouseDown={e => handleResizeStart(e, 'n')}
            />
            <div
              className={cn(styles.resize_handle, styles.resize_s)}
              onMouseDown={e => handleResizeStart(e, 's')}
            />
            <div
              className={cn(styles.resize_handle, styles.resize_e)}
              onMouseDown={e => handleResizeStart(e, 'e')}
            />
            <div
              className={cn(styles.resize_handle, styles.resize_w)}
              onMouseDown={e => handleResizeStart(e, 'w')}
            />
            <div
              className={cn(styles.resize_handle, styles.resize_ne)}
              onMouseDown={e => handleResizeStart(e, 'ne')}
            />
            <div
              className={cn(styles.resize_handle, styles.resize_nw)}
              onMouseDown={e => handleResizeStart(e, 'nw')}
            />
            <div
              className={cn(styles.resize_handle, styles.resize_se)}
              onMouseDown={e => handleResizeStart(e, 'se')}
            />
            <div
              className={cn(styles.resize_handle, styles.resize_sw)}
              onMouseDown={e => handleResizeStart(e, 'sw')}
            />
          </>
        )}
      </div>
    </Draggable>
  )
}
