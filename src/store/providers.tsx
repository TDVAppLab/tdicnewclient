import React from 'react'

import { store,StoreContext } from '@/app/stores/store'

import { LayoutSizeProvider } from './layoutsizeprovider'

type Props = {
  children: React.ReactNode
}
export const Providers: React.FC<Props> = (props) => {
  return (
    <StoreContext.Provider value={store}>
        <LayoutSizeProvider>{props.children}</LayoutSizeProvider>
    </StoreContext.Provider>
  )
}
