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
      {
        text: 'Bootstrap a App',
        link: '/study/essentials/bootstrap'
      },
      {
        text: 'Reactivity Fundamentals',
        link: '/study/essentials/reactivity-fundamentals'
      },
      {
        text: 'Composition API FAQ',
        link: '/study/essentials/composition-api-faq'
      },
      {
        text: 'Computed Properties',
        link: '/study/essentials/computed'
      },
      {
        text: 'Template Syntax',
        link: '/study/essentials/template-syntax'
      },
      {
        text: 'Rendering List',
        link: '/study/essentials/list'
      },
      {
        text: 'Rendering Conditionally',
        link: '/study/essentials/conditional'
      },
      {
        text: 'Event Handling',
        link: '/study/essentials/event-handling'
      },
      {
        text: 'Class and Style Bindings',
        link: '/study/essentials/class-and-style'
      },
      {
        text: 'Form Input Bindings',
        link: '/study/essentials/forms'
      }
    ]
  },
  {
    text: 'Components',
    items: [
      {
        text: 'Component Basics',
        link: '/study/components/component-basics'
      },
      {
        text: 'Single-File Components',
        link: '/study/components/sfc'
      },
      {
        text: 'Lifecycle Hooks',
        link: '/study/components/lifecycle'
      }
    ]
  }
]
