import { FC, useEffect, useState } from 'react'
import styles from './Clock.module.scss'

export const Clock: FC = () => {
  const [clock, setClock] = useState<string>()
  useEffect(() => {
    setInterval(() => {
      const date = new Date()
      setClock(
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      )
    }, 1000)
  }, [])
  return (
    <div className={styles.clock}>
      <span>{clock}</span>
    </div>
  )
}
