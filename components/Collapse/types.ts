export interface CollapseProps {
  /** 标题文本 */
  title: string
  /** 是否默认展开 */
  defaultOpen?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义徽章文本 */
  badge?: string
  /** 自定义徽章颜色 */
  badgeColor?: string
  /** 是否显示边框 */
  bordered?: boolean
  /** 是否显示阴影 */
  shadow?: boolean
  /** 底部外边距（像素） */
  marginBottom?: number | string
}

export interface CollapseEmits {
  /** 展开/收起状态改变时触发 */
  change: [isOpen: boolean]
  /** 点击标题时触发 */
  'title-click': [event: MouseEvent]
}
