import { useMemo } from 'react'
import { capitalize } from 'remeda'

import { type Account, accountList, AccountType } from '@/lib/api'

import { Table, type TableColumn } from '../Table'

export const AccountTable = () => {
  const columns = useMemo<TableColumn[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'type',
        header: 'Type',
        filterVariant: 'select' as const,
        selectData: Object.entries(AccountType).map(([key, value]) => ({
          label: capitalize(key.toLowerCase()),
          value,
        })),
      },
      {
        accessorKey: 'iban',
        header: 'Iban',
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        enableSorting: true,
      },
    ],
    [],
  )

  return <Table<Account> id="accounts" list={accountList} columns={columns} />
}
