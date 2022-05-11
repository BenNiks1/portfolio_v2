export interface DesktopData {
  label: string
  currentIcon: number
  icon: string
  hasChildren: boolean
  window?: WindowData
}

export interface WindowData extends DesktopData {
  isGame?: boolean
  title: string
  text: string
}
