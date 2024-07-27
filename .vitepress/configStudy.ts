import type {
  NavItem,
  SidebarGroup
} from '@vue/theme/src/vitepress/config.js'

export const studyNavItem: NavItem = {
  text: 'Study',
  activeMatch: `^/study/`,
  items: [
    { text: 'Essentials', link: '/study/essentials/bootstrap' }
    // { text: 'Components', link: '/study/components' },
    // { text: 'Intermediate', link: '/study/intermediate' },
    // { text: 'Ecosystem', link: '/study/ecosystem' },
    // { text: 'Challenge', link: '/study/challenge' }
  ]
}

export const studySidebarGroup: SidebarGroup[] = [
  {
    text: 'Essentials',
    items: [
      { text: 'Bootstrap a App', link: '/study/essentials/bootstrap' }
    ]
  }
]
