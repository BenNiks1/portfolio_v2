export interface DesktopData {
  id: number
  label: string
  currentIcon: number
  icon: string
  hasChildren: boolean
  window?: WindowData
  link?: string
}

export interface WindowData extends DesktopData {
  title: string
  text: string
}
