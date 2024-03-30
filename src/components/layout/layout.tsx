import type { ReactNode } from 'react'

import NewHeader from './newheader'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NewHeader />
      <main>{children}</main>
      {
        //<Footer />
      }
    </>
  )
}
