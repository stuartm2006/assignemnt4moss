import React, { createContext, useContext } from 'react'
import useItems from '../hooks/useItems'

export const ItemsContext = createContext(null)

export function ItemsProvider({ children }) {
  const value = useItems()
  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}
