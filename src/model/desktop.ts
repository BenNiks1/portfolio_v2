export interface DesktopData {
  id: number
  label: string
  currentIcon: number
  icon: string
  hasChildren: boolean
  windowData?: WindowData
  link?: string
  x: number
  y: number
}

export interface WindowData extends DesktopData {
  isGame?: boolean
  title: string
  text: string
}
