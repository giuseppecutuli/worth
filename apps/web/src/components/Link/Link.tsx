import { Anchor, type AnchorProps } from '@mantine/core'
import { Link as RouterLink } from '@tanstack/react-router'

type Props = AnchorProps & {
  children: React.ReactNode
  to?: string
}

export const Link: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Anchor component={RouterLink} {...props}>
      {children}
    </Anchor>
  )
}
