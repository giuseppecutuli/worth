import { Flex, type FlexProps, Text, Title } from '@mantine/core'

import Icon from '@/assets/svg/logo.svg?react'

type Props = FlexProps

export const Logo: React.FC<Props> = (props) => {
  return (
    <Flex align="center" columnGap={8} {...props}>
      <Icon height={60} width={60} />
      <div>
        <Title c="teal.8">WORTH</Title>
        <Text fw={500} c="teal.8">
          Track Your Finances
        </Text>
      </div>
    </Flex>
  )
}
