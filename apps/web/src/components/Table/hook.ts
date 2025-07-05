import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from 'mantine-react-table'
import { useMemo } from 'react'

import { type PaginatedResponse, type PaginateDto } from '@/lib/api'

export interface UseListParams<T> {
  key: string
  columnFilters: MRT_ColumnFiltersState
  sorting: MRT_SortingState
  pagination: MRT_PaginationState
  include?: string[]
  list: (data: { query: PaginateDto }) => Promise<PaginatedResponse<T>>
}

export const useList = <T>({
  columnFilters,
  sorting,
  pagination,
  include,
  list,
  key,
}: UseListParams<T>) => {
  const query = useMemo(() => {
    const query: PaginateDto = {
      page: pagination.pageIndex,
      limit: pagination.pageSize,
      include,
    }

    for (const filter of columnFilters) {
      // @ts-ignore This is accepted by the API because the definition is inside the component
      query[filter.id] = filter.value
    }

    const [sort] = sorting
    if (sort) {
      query.order = `${sort.id}:${sort.desc ? 'desc' : 'asc'}`
    }

    return query
  }, [columnFilters, sorting, pagination, include])

  return useQuery({
    queryKey: [key, query],
    queryFn: () =>
      list({
        query,
      }),
    placeholderData: keepPreviousData, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
    staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
  })
}
