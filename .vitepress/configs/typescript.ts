import type {
  NavItem,
  SidebarGroup
} from '@vue/theme/src/vitepress/config.js'

export const tsNavItem: NavItem = {
  text: 'Typescript',
  activeMatch: `^/typescript/`,
  items: [
    {
      text: 'Vue 3 + Typescript',
      items: [
        { text: 'Overview', link: '/typescript/overview' },
        {
          text: 'Vue Typing Guide',
          link: '/typescript/composition-api'
        }
      ]
    }
  ]
}

export const tsSidebarGroup: SidebarGroup[] = [
  {
    text: 'Get Started',
    items: [{ text: 'Overview', link: '/typescript/overview' }]
  },
  {
    text: 'Vue Typing Guide',
    items: [
      {
        text: 'Component props',
        link: '/typescript/composition-api/props'
      },
      {
        text: 'Component emits',
        link: '/typescript/composition-api/emits'
      },
      {
        text: 'State ref()',
        link: '/typescript/composition-api/ref'
      },
      {
        text: 'State reactive()',
        link: '/typescript/composition-api/reactive'
      },
      {
        text: 'State computed()',
        link: '/typescript/composition-api/computed'
      },
      {
        text: 'Event Handler',
        link: '/typescript/composition-api/event-handler'
      },
      {
        text: 'Provide / Inject',
        link: '/typescript/composition-api/provide-inject'
      },
      {
        text: 'Template Ref',
        link: '/typescript/composition-api/template-ref'
      }
    ]
  }
]
