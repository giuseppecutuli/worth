import { Anchor, type AnchorProps } from '@mantine/core'
import { Link as RouterLink, type LinkProps } from '@tanstack/react-router'

type Props = AnchorProps &
  LinkProps & {
    children: React.ReactNode
    onClick?: () => void
    to?: string
  }

export const Link: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Anchor renderRoot={(props) => <RouterLink {...props} />} {...props}>
      {children}
    </Anchor>
  )
}
