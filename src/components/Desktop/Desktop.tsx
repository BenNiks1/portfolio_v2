import { FC } from 'react'
import { DesktopIcon, Start } from '../../components'
import { useQuery } from 'react-query'
import styles from './Desktop.module.scss'
import { useAction, useTypedSelector } from '../../hooks'
import { getDesktopData } from '../../api'
import cn from 'classnames'
import { DesktopData } from '../../model'

export const Desktop: FC = () => {
  const { data: response, isLoading } = useQuery(
    'desktopData',
    async () => await getDesktopData(),
    {
      onError(error) {
        console.error(error)
      },
      refetchOnWindowFocus: false,
    }
  )
  const { setActiveIcon, setActiveStartIcon } = useAction()
  const { activeStartIcon, activeIcon } = useTypedSelector(state => state.app)
  const onDesktopClick = () => {
    activeIcon && setActiveIcon(0)
    activeStartIcon && setActiveStartIcon(0)
  }
  if (isLoading) return <></>
  return (
    <main className={styles.windows}>
      <div
        className={cn(styles.windows__desktop, 'desktop')}
        onClick={onDesktopClick}
      >
        {response?.data.map((iconData: DesktopData) => (
          <DesktopIcon key={iconData.currentIcon} {...iconData} />
        ))}
      </div>
      <div className={styles.windows__start}>
        <Start />
      </div>
    </main>
  )
}
