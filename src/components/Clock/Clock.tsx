import { FC, useEffect, useState } from 'react'
import styles from './Clock.module.scss'

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export const Clock: FC = () => {
  const [clock, setClock] = useState<string>(formatTime)
  useEffect(() => {
    const intervalId = setInterval(() => setClock(formatTime()), 1000)
    return () => clearInterval(intervalId)
  }, [])
  return (
    <div className={styles.clock}>
      <span>{clock}</span>
    </div>
  )
}
