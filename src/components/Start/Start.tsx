import { FC, useState } from 'react'
import styles from './Start.module.scss'
import logo from '../../assets/logo.png'
import { StartMenu } from '.'
import cn from 'classnames'
import { Clock } from '..'
import { useAction, useTypedSelector } from '../../hooks'
import { StartIcon } from '../../model/start'

export const Start: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { setActiveStartIcon } = useAction()
  const { activeWindow, activeStartIcon } = useTypedSelector(state => state.app)
  return (
    <div className={styles.start_panel}>
      <div className={styles.start_panel__wrapper}>
        <div
          className={cn(styles.start_panel__button, {
            [styles.active]: isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={logo} alt='win' className={styles.start_panel__logo} />
          <span className={styles.start_panel__text}>Start</span>
        </div>
        {!!activeWindow.length &&
          activeWindow.map((window: StartIcon) => (
            <div
              key={window.id}
              className={cn(styles.start_panel__button, {
                [styles.active]: activeStartIcon === window.id,
              })}
              onClick={() => {
                setActiveStartIcon(window.id)
              }}
            >
              {window.label}
            </div>
          ))}
      </div>
      <Clock />
      {isOpen && <StartMenu setIsOpen={setIsOpen} />}
    </div>
  )
}
