import { type FC, type ReactNode } from 'react'

type Item =
  | {
      component: FC<any>
      props?: any
    }
  | FC<any>

/**
 * This method permit to combine different components into one.
 * For example is useful for combine providers.
 *
 * @param components - Components to combine
 * @returns - Single component with rendered components combined
 */
export const combineComponents = (components: Item[]): FC<{ children?: ReactNode }> => {
  const CombinedComponent: FC<{ children?: ReactNode }> = ({ children }) => {
    return components.reduceRight((acc, el) => {
      const Comp = typeof el === 'function' ? el : el.component
      const props = typeof el === 'function' ? undefined : el.props

      return <Comp {...props}>{acc}</Comp>
    }, children)
  }

  CombinedComponent.displayName = 'CombinedComponent'

  return CombinedComponent
}
