import type {
  NavItem,
  SidebarGroup
} from '@vue/theme/src/vitepress/config.js'

export const studyNavItem: NavItem = {
  text: 'Junior',
  activeMatch: `^/study/`,
  items: [
    {
      text: 'Junior Developer',
      items: [
        { text: 'Essentials', link: '/study/essentials/bootstrap' },
        { text: 'Components', link: '/study/components/component-basics' },
        { text: 'Intermediate', link: '/study/intermediate/watchers' }
      ]
    },
    {
      text: 'Ecosystem',
      items: [
        {
          text: 'IDE Extension',
          link: 'https://github.com/vuejs/language-tools'
        },
        { text: 'Vue Router', link: 'https://github.com/vuejs/router' },
        { text: 'Pinia', link: 'https://github.com/vuejs/pinia' },
        { text: 'VueUse', link: 'https://github.com/vueuse/vueuse' },
        {
          text: 'Vue Devtools',
          link: 'https://github.com/vuejs/devtools-next'
        },
        { text: 'Vuetify', link: 'https://github.com/vuetifyjs/vuetify' },

        { text: 'Nuxt', link: 'https://github.com/nuxt/nuxt' }
      ]
    }
  ]
}

export const studySidebarGroup: SidebarGroup[] = [
  {
    text: 'Essentials 2nd',
    items: [
      { text: 'Overview', link: '/study/overview' },
      {
        text: 'Bootstrap a App',
        link: '/study/essentials/bootstrap'
      },
      {
        text: 'Composition API FAQ',
        link: '/study/essentials/composition-api-faq'
      },
      {
        text: 'Reactivity Fundamentals',
        link: '/study/essentials/reactivity-fundamentals'
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
        text: 'Class and Style Bindings',
        link: '/study/essentials/class-and-style'
      },
      {
        text: 'Rendering Conditionally',
        link: '/study/essentials/conditional'
      },
      {
        text: 'Rendering List',
        link: '/study/essentials/list'
      },
      {
        text: 'Event Handling',
        link: '/study/essentials/event-handling'
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
        text: 'Ex Registration',
        link: '/study/components/registration'
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
      },
      {
        text: 'Custom Directives',
        link: '/study/intermediate/custom-directives'
      }
    ]
  }
  // {
  //   text: 'Ecosystem',
  //   items: [
  //     {
  //       text: 'Vue Router',
  //       link: '/study/ecosystem/vue-router'
  //     }
  //   ]
  // }
]

export const seniorNavItem: NavItem = {
  text: 'Senior',
  activeMatch: `^/senior/`,
  items: [
    {
      text: 'Senior Developer',
      items: [
        {
          text: 'Advanced Component',
          link: '/senior/components/v-model'
        },
        {
          text: 'Typescript',
          link: '/senior/typescript/overview'
        },
        {
          text: 'Best Practice',
          link: '/senior/best/composables'
        }
      ]
    }
  ]
}

export const seniorSidebarGroup: SidebarGroup[] = [
  {
    text: 'Advanced Components',
    items: [
      {
        text: 'Props',
        link: '/senior/components/props'
      },
      {
        text: 'Events',
        link: '/senior/components/events'
      },
      {
        text: 'Ex Fallthrough Attributes',
        link: '/senior/components/attrs'
      },
      {
        text: 'v-model',
        link: '/senior/components/v-model'
      },
      {
        text: 'Provide / Inject',
        link: '/senior/components/provide-inject'
      }
    ]
  },
  {
    text: 'Typescript',
    items: [
      {
        text: 'Overview',
        link: '/senior/typescript/overview'
      },
      {
        text: 'Recipe',
        link: '/senior/typescript/composition-api'
      }
    ]
  },
  {
    text: 'Best Practice',
    items: [
      {
        text: 'Composable',
        link: '/senior/best/composables'
      },
      {
        text: 'Utilities API',
        link: '/senior/best/reactivity-utilities'
      },
      {
        text: 'State Management',
        link: '/senior/best/state-management'
      },
      {
        text: 'Pinia',
        link: '/senior/best/pinia'
      },
      {
        text: 'Pinia State',
        link: '/senior/best/pinia-state'
      },
      {
        text: 'Pinia Getters',
        link: '/senior/best/pinia-getters'
      },
      {
        text: 'Pinia Actions',
        link: '/senior/best/pinia-actions'
      },
      {
        text: 'Error Handling',
        link: '/senior/best/error-api'
      },
      {
        text: 'Performance',
        link: '/senior/best/performance'
      },
      {
        text: 'Security',
        link: '/senior/best/security'
      }
    ]
  },
  {
    text: 'Deeper Dive',
    items: [
      // reactivity in depth
      {
        text: 'Rendering Mechanism',
        link: '/senior/components/rendering-mechanism'
      },
      {
        text: 'Render Function & JSX',
        link: '/senior/components/render-function'
      },
      {
        text: 'Render Function API',
        link: '/senior/components/render-function-copy'
      }
    ]
  }
]
