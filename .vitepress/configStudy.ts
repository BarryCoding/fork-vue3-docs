import type {
  NavItem,
  SidebarGroup
} from '@vue/theme/src/vitepress/config.js'

export const studyNavItem: NavItem = {
  text: 'Study',
  activeMatch: `^/study/`,
  items: [
    {
      text: 'Junior Vue Developer',
      items: [
        { text: 'Essentials', link: '/study/essentials/bootstrap' },
        { text: 'Components', link: '/study/components/component-basics' },
        { text: 'Intermediate', link: '/study/intermediate/watchers' }
        // { text: 'Ecosystem', link: '/study/ecosystem' },
        // { text: 'Challenge', link: '/study/challenge' }
      ]
    },
    {
      text: 'Ecosystem',
      items: [
        { text: 'Vue Router', link: 'https://github.com/vuejs/router' },
        { text: 'VueUse', link: 'https://github.com/vueuse/vueuse' },
        {
          text: 'Vue Devtools',
          link: 'https://github.com/vuejs/devtools-next'
        },
        { text: 'Vuetify', link: 'https://github.com/vuetifyjs/vuetify' },
        {
          text: 'VS Code Extension',
          link: 'https://github.com/vuejs/language-tools'
        },
        { text: 'Nuxt', link: 'https://github.com/nuxt/nuxt' }
      ]
    }
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
      },
      {
        text: 'Slots',
        link: '/study/components/slots'
      },
      {
        text: 'Async Components',
        link: '/study/components/async'
      }
    ]
  },
  {
    text: 'Intermediate',
    items: [
      {
        text: 'Watchers',
        link: '/study/intermediate/watchers'
      },
      {
        text: 'Template Refs',
        link: '/study/intermediate/template-refs'
      },
      {
        text: 'Transition',
        link: '/study/intermediate/transition'
      },
      {
        text: 'TransitionGroup',
        link: '/study/intermediate/transition-group'
      },
      {
        text: 'Plugins',
        link: '/study/intermediate/plugins'
      }
    ]
  },
  {
    text: 'Ecosystem',
    items: [
      {
        text: 'Vue Router',
        link: '/study/ecosystem/vue-router'
      }
    ]
  }
]
