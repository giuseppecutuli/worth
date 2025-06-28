import { Paper, Tabs } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { AccountForm, SecurityForm } from '@/components'

import classes from './Settings.module.scss'

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation()

  const tabs = [
    { value: 'account', label: t('general.account'), content: <AccountForm /> },
    { value: 'security', label: t('general.security'), content: <SecurityForm /> },
  ]

  return (
    <Paper withBorder shadow="sm" p={22} radius="md">
      <Tabs defaultValue="account" classNames={{ tab: classes.tab, list: classes.list }}>
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabs.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value} pt="lg">
            {tab.content}
          </Tabs.Panel>
        ))}
      </Tabs>
    </Paper>
  )
}
