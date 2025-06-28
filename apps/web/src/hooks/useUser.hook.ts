import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuth } from '@/contexts/Auth'
import { type ApiError, updateUser, type UpdateUserDto, type User } from '@/lib/api'

export const useUser = () => {
  const { t } = useTranslation()
  const { user, refetchUser } = useAuth()

  const updateUserMutation = useMutation<User, ApiError, UpdateUserDto>({
    mutationFn: (data: UpdateUserDto) => updateUser({ id: user!.id, data }),
  })

  useEffect(() => {
    if (updateUserMutation.isSuccess) {
      notifications.show({
        message: t('notifications.user.update.success'),
        position: 'top-right',
        color: 'green',
      })
      refetchUser?.()
    }
  }, [updateUserMutation.isSuccess])

  return {
    user,
    updateUser: updateUserMutation,
  }
}
