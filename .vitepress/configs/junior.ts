import type {
  NavItem,
  SidebarGroup
} from '@vue/theme/src/vitepress/config.js'

export const JUNIOR_PATH = '/custom/junior/'

export const tsNavItem: NavItem = {
  text: 'Junior',
  activeMatch: `^${JUNIOR_PATH}`,
  items: [
    {
      text: 'Vue 3 + Junior',
      items: [
        { text: 'Overview', link: JUNIOR_PATH + 'overview' },
        {
          text: 'Vue Typing Guide',
          link: JUNIOR_PATH + 'composition-api/props'
        }
      ]
    }
  ]
}

export const tsSidebarGroup: SidebarGroup[] = [
  {
    text: 'Get Started',
    items: [{ text: 'Overview', link: JUNIOR_PATH + 'overview' }]
  },
  {
    text: 'Vue Typing Guide',
    items: [
      {
        text: 'Component props',
        link: JUNIOR_PATH + 'composition-api/props'
      },
      {
        text: 'Component emits',
        link: JUNIOR_PATH + 'composition-api/emits'
      },
      {
        text: 'State ref()',
        link: JUNIOR_PATH + 'composition-api/ref'
      },
      {
        text: 'State reactive()',
        link: JUNIOR_PATH + 'composition-api/reactive'
      },
      {
        text: 'State computed()',
        link: JUNIOR_PATH + 'composition-api/computed'
      },
      {
        text: 'Event Handler',
        link: JUNIOR_PATH + 'composition-api/event-handler'
      },
      {
        text: 'Provide / Inject',
        link: JUNIOR_PATH + 'composition-api/provide-inject'
      },
      {
        text: 'Template Ref',
        link: JUNIOR_PATH + 'composition-api/template-ref'
      }
    ]
  }
]
