import { createFileRoute } from '@tanstack/react-router'

import { AccountsPage } from '@/pages/Accounts'

export const Route = createFileRoute('/__auth/accounts')({
  component: AccountsPage,
})
