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
        { text: 'Vue 3 Documentation', link: 'https://v3.vuejs.org/' },
        {
          text: 'VS Code Extension',
          link: 'https://github.com/vuejs/language-tools'
        },
        {
          text: 'Vue Devtools',
          link: 'https://github.com/vuejs/devtools-next'
        },
        { text: 'Vue Router', link: 'https://github.com/vuejs/router' }
      ]
    }
  ]
}

export const studySidebarGroup: SidebarGroup[] = [
  {
    text: 'Essentials',
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
        text: 'Custom Directives',
        link: '/study/intermediate/custom-directives'
      },
      {
        text: 'Plugins',
        link: '/study/intermediate/plugins'
      }
    ]
  },
  {
    text: 'Build-in Components',
    items: [
      {
        text: 'Transition',
        link: '/study/intermediate/transition'
      },
      {
        text: 'TransitionGroup',
        link: '/study/intermediate/transition-group'
      }
    ]
  }
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
          text: 'Typescript Vue',
          link: '/senior/typescript/overview'
        },
        {
          text: 'Best Practice',
          link: '/senior/best/composables'
        },
        {
          text: 'Testing',
          link: '/senior/best/testing'
        },
        {
          text: 'Deeper Dive',
          link: '/senior/deep/reactivity-in-depth'
        }
      ]
    },
    {
      text: 'Ecosystem',
      items: [
        { text: 'Pinia', link: 'https://github.com/vuejs/pinia' },
        { text: 'VueUse', link: 'https://github.com/vueuse/vueuse' }
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
      // TODO: delete Pinia
      // {
      //   text: 'Pinia',
      //   link: '/senior/best/pinia'
      // },
      // {
      //   text: 'Pinia State',
      //   link: '/senior/best/pinia-state'
      // },
      // {
      //   text: 'Pinia Getters',
      //   link: '/senior/best/pinia-getters'
      // },
      // {
      //   text: 'Pinia Actions',
      //   link: '/senior/best/pinia-actions'
      // },
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
      },
      {
        text: 'SSR',
        link: '/senior/best/ssr'
      }
    ]
  },
  {
    text: 'Tests',
    items: [
      {
        text: 'Testing Fundamentals',
        link: '/senior/best/testing'
      },
      {
        text: 'Vitest',
        link: '/senior/best/vitest'
      },
      {
        text: 'Vue Test Utils',
        link: '/senior/best/vue-test-utils'
      }
    ]
  },
  {
    text: 'Deeper Dive',
    items: [
      {
        text: 'Reactivity In Depth',
        link: '/senior/deep/reactivity-in-depth'
      },
      {
        text: 'Rendering Mechanism',
        link: '/senior/deep/rendering-mechanism'
      },
      {
        text: 'Render Function & JSX',
        link: '/senior/deep/render-function'
      },
      {
        text: 'Render Function API',
        link: '/senior/deep/render-function-api'
      }
    ]
  }
]

export const moreNavItem: NavItem = {
  text: 'More',
  activeMatch: `^/custom/more/`,
  items: [
    {
      text: 'Github Awesome',
      items: [
        { text: 'Repo Stars 10K+', link: '/custom/more/github-stars' }
      ]
    },
    {
      text: 'More Concepts',
      items: [
        {
          text: 'Component',
          link: '/senior/components/v-model'
        },
        {
          text: 'Build-in Components',
          link: '/senior/typescript/overview'
        },
        {
          text: 'Extra Topics',
          link: '/senior/best/composables'
        },
        {
          text: 'Style Guild',
          link: '/custom/more/style-guide/rules-essential'
        }
      ]
    },
    {
      text: 'Ecosystem',
      items: [
        { text: 'Vite', link: 'https://github.com/vitejs/vite' },
        { text: 'Vitepress', link: 'https://github.com/vuejs/vitepress' },
        { text: 'Nuxt', link: 'https://github.com/nuxt/nuxt' }
      ]
    }
  ]
}

export const moreSidebarGroup: SidebarGroup[] = [
  {
    text: 'More on Components',
    items: [
      {
        text: 'Registration',
        link: '/custom/more/components/registration'
      },
      {
        text: 'Fallthrough Attributes',
        link: '/custom/more/components/attrs'
      }
    ]
  },
  {
    text: 'Build-in Components',
    items: [
      {
        text: 'TODO KeepAlive',
        link: '/study/intermediate/transition'
      },
      {
        text: 'TODO Suspense',
        link: '/study/intermediate/transition'
      },
      {
        text: 'TODO Teleport',
        link: '/study/intermediate/transition-group'
      }
    ]
  },
  {
    text: 'Extra Topics',
    items: [
      {
        text: 'TODO Ways of Using Vue',
        link: '/study/essentials/bootstrap'
      },
      {
        text: 'Tooling',
        link: '/custom/more/extra/tooling'
      },
      {
        text: 'TODO Deployment',
        link: '/senior/best/tooling'
      },
      {
        text: 'TODO Accessibility',
        link: '/senior/best/tooling'
      },
      {
        text: 'TODO Web Component',
        link: '/senior/best/tooling'
      },
      {
        text: 'TODO Animation',
        link: '/senior/best/tooling'
      }
    ]
  },
  {
    text: 'Style Guide',
    items: [
      {
        text: 'Priority A',
        link: '/custom/more/style-guide/rules-essential'
      },
      {
        text: 'Priority B',
        link: '/custom/more/style-guide/rules-strongly-recommended'
      },
      {
        text: 'Priority C',
        link: '/custom/more/style-guide/rules-recommended'
      },
      {
        text: 'Reasons to Get Fired',
        link: '/custom/more/style-guide/rules-use-with-caution'
      }
    ]
  }
]
