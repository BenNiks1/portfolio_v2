import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Bios, Desktop, PowerOff, Shutdown } from './components'
import { useAction, useTypedSelector } from './hooks'
import {
  POWER_STATUS_OFF,
  POWER_STATUS_ON,
  POWER_STATUS_SHUTDOWN,
  POWER_STATUS_START,
} from './utils'

const queryClient = new QueryClient()

export const App = () => {
  const powerStatus = useTypedSelector(state => state.app.powerStatus)
  const { setPowerStatus } = useAction()
  useEffect(() => {
    if (powerStatus === POWER_STATUS_START) {
      localStorage.setItem('powerStatus', POWER_STATUS_START)
      setTimeout(() => {
        localStorage.setItem('powerStatus', POWER_STATUS_ON)
        setPowerStatus(POWER_STATUS_ON)
      }, 4000)
    } else if (powerStatus === POWER_STATUS_OFF) {
      localStorage.setItem('powerStatus', POWER_STATUS_OFF)
    } else {
      localStorage.setItem('powerStatus', POWER_STATUS_ON)
    }
  }, [powerStatus])
  return (
    <QueryClientProvider client={queryClient}>
      {powerStatus === POWER_STATUS_START && <Bios />}
      {powerStatus === POWER_STATUS_ON && <Desktop />}
      {powerStatus === POWER_STATUS_OFF && <PowerOff />}
      {powerStatus === POWER_STATUS_SHUTDOWN && <Shutdown />}
    </QueryClientProvider>
  )
}
