import { useAction } from '../../hooks'
import { POWER_STATUS_START } from '../../utils'
import { ReactComponent as PowerIcon } from '../../assets/power.svg'
import styles from './PowerOff.module.scss'

export const PowerOff = () => {
  const { setPowerStatus } = useAction()
  const onPowerClick = () => {
    setPowerStatus(POWER_STATUS_START)
  }
  return (
    <main className={styles.poweroff}>
      <div className={styles.poweroff__button} onClick={onPowerClick}>
        <PowerIcon />
      </div>
    </main>
  )
}
