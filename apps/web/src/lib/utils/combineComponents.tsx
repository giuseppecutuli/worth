import { type FC, type ReactNode } from 'react'

/**
 * This method permit to combine different components into one.
 * For example is useful for combine providers.
 *
 * @param components - Components to combine
 * @returns - Single component with rendered components combined
 */
export const combineComponents = (components: FC<{ children: ReactNode }>[]): FC<{ children: ReactNode }> => {
  const CombinedComponent: FC<{ children: ReactNode }> = ({ children }) => {
    return components.reduceRight((acc, Comp) => {
      return <Comp>{acc}</Comp>
    }, children)
  }

  CombinedComponent.displayName = 'CombinedComponent'

  return CombinedComponent
}
