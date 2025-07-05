import { ActionIcon, Flex, Tooltip } from '@mantine/core'
import { IconEdit, IconRefresh, IconTrash } from '@tabler/icons-react'
import {
  MantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_Row,
  type MRT_RowData,
  type MRT_SortingState,
  useMantineReactTable,
} from 'mantine-react-table'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useList, type UseListParams } from './hook'

export type TableColumn = {
  accessorKey: string
  header: string
  enableSorting?: boolean
  filterVariant?: MRT_ColumnDef<any>['filterVariant']
  selectData?: { label: string; value: string }[]
  enableColumnFilter?: boolean
}

export type TableProps<T extends MRT_RowData> = {
  id: string
  list: UseListParams<T>['list']
  columns: TableColumn[]
  onEdit?: (row: MRT_Row<T>) => void
  onDelete?: (row: MRT_Row<T>) => void
  include?: UseListParams<T>['include']
}

export const Table = <T extends MRT_RowData>({
  columns: _columns,
  list,
  id,
  onDelete,
  onEdit,
  include,
}: TableProps<T>) => {
  const { t } = useTranslation()

  const columns = useMemo<MRT_ColumnDef<T>[]>(
    () =>
      _columns.map<MRT_ColumnDef<T>>((col) => ({
        accessorKey: col.accessorKey,
        header: col.header,
        enableSorting: col.enableSorting ?? false,
        filterVariant: col.filterVariant,
        enableColumnFilter: col.enableColumnFilter ?? false,
        mantineFilterSelectProps: col.selectData
          ? {
              data: col.selectData,
            }
          : undefined,
      })),
    [_columns],
  )

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isError, isFetching, isLoading, refetch } = useList<T>({
    list,
    key: id,
    columnFilters,
    pagination,
    sorting,
    include,
  })

  const table = useMantineReactTable({
    columns,
    data: data?.data ?? [],
    enableColumnFilterModes: false,
    initialState: { showColumnFilters: false },
    enableGlobalFilter: false,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    enableDensityToggle: false,
    mantineToolbarAlertBannerProps: isError
      ? {
          color: 'red',
          children: t('table.errorLoadingData'),
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderTopToolbarCustomActions: () => (
      <Tooltip label={t('table.refreshData')}>
        <ActionIcon onClick={() => refetch()}>
          <IconRefresh />
        </ActionIcon>
      </Tooltip>
    ),
    rowCount: data?.count ?? 0,
    state: {
      columnFilters,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
    getRowId: (row) => row.id,
    renderRowActions: ({ row }) => {
      if (!onEdit && !onDelete) {
        return null
      }

      return (
        <Flex gap="md">
          {onEdit && (
            <Tooltip label={t('table.edit')}>
              <ActionIcon onClick={() => onEdit(row)}>
                <IconEdit />
              </ActionIcon>
            </Tooltip>
          )}

          {onDelete && (
            <Tooltip label={t('table.delete')}>
              <ActionIcon color="red" onClick={() => onDelete(row)}>
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          )}
        </Flex>
      )
    },
  })

  return <MantineReactTable table={table} />
}
