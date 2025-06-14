import { Paper, Tabs } from '@mantine/core'
import { IconMessageCircle, IconPhoto } from '@tabler/icons-react'

import { AccountForm } from '@/components/AccountForm'

import classes from './Settings.module.scss'

export const SettingsPage: React.FC = () => {
  const tabs = [
    { value: 'account', label: 'Account', content: <AccountForm /> },
    { value: 'settings', label: 'Settings', content: null },
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
