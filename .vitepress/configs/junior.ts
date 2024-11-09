import type {
  NavItem,
  SidebarGroup
} from '@vue/theme/src/vitepress/config.js'

export const JUNIOR_PATH = '/custom/junior/'

export const juniorNavItem: NavItem = {
  text: 'Junior',
  activeMatch: `^${JUNIOR_PATH}`,
  items: [
    {
      text: 'Junior Developer',
      items: [
        { text: 'Overview', link: JUNIOR_PATH + 'overview' },
        { text: 'Essentials', link: JUNIOR_PATH + 'essentials/bootstrap' }
      ]
    }
  ]
}

export const juniorSidebarGroup: SidebarGroup[] = [
  {
    text: 'Bird View',
    items: [
      // { text: 'Overview', link: JUNIOR_PATH + 'overview' },
      {
        text: 'Quick Start',
        link: JUNIOR_PATH + 'quick-start'
      },
      {
        text: 'Composition API Locked',
        link: JUNIOR_PATH + 'composition-api-faq'
      }
    ]
  },

  {
    text: 'Essentials',
    items: [
      {
        text: 'Reactivity',
        link: JUNIOR_PATH + 'essentials/reactivity-fundamentals'
      },
      {
        text: 'Computed',
        link: JUNIOR_PATH + 'essentials/computed'
      },
      {
        text: 'Watcher',
        link: JUNIOR_PATH + 'essentials/watchers'
      },
      {
        text: 'Template Syntax',
        link: JUNIOR_PATH + 'essentials/template-syntax'
      },
      {
        text: 'Class and Style',
        link: JUNIOR_PATH + 'essentials/class-and-style'
      },
      {
        text: 'Render Conditionally',
        link: JUNIOR_PATH + 'essentials/conditional'
      },
      {
        text: 'Render List',
        link: JUNIOR_PATH + 'essentials/list'
      }
      // {
      //   text: 'Handle Event',
      //   link: JUNIOR_PATH + 'essentials/event-handling'
      // },
      // {
      //   text: 'Form Input',
      //   link: JUNIOR_PATH + 'essentials/forms'
      // }
    ]
  }
]
