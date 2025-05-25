import { Box, Flex, type FlexProps, Text, Title } from '@mantine/core'

import Icon from '@/assets/svg/logo.svg?react'

type Props = FlexProps & { collapsed?: boolean }

export const Logo: React.FC<Props> = ({ c = 'teal.8', collapsed, ...props }) => {
  const size = collapsed ? 30 : 60

  return (
    <Flex align="center" columnGap={8} {...props}>
      <Icon height={size} width={size} />
      <Box hidden={collapsed}>
        <Title c={c}>WORTH</Title>
        <Text fw={500} c={c}>
          Track Your Finances
        </Text>
      </Box>
    </Flex>
  )
}
