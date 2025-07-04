import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import 'mantine-react-table/styles.css'
import '@fontsource-variable/inter'
// Initialize i18n before instantiate the react app
import './lib/i18n'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from './contexts/Auth'
import { I18nProvider } from './contexts/I18n'
import { RouterProvider } from './contexts/Router'
import { queryClient } from './lib/api'
import { theme } from './lib/theme'
import { combineComponents } from './lib/utils'

/**
 * List of provider that need to initialize on start up of the app.
 * This provider will be combined in a single components with the utils
 * combineComponents.
 *
 * !! IMPORTANT
 * The order is crucial, the provider will be initialize in the order
 * of the array, consider this when you insert it another one.
 */
const providers = [
  {
    component: MantineProvider,
    props: { theme },
  },
  ModalsProvider,
  I18nProvider,
  {
    component: QueryClientProvider,
    props: { client: queryClient },
  },
  AuthProvider,
  RouterProvider,
]

const MainApp = combineComponents(providers)

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <MainApp />
    </StrictMode>,
  )
}
