import React from 'react'

export type LayoutSizeContextType = {
  headerHight: number
  setHeaderHight: (headerHight: number) => void
  footerHight: number
  setFooterHight: (footerHight: number) => void
}
const LayoutSizeContext = React.createContext<LayoutSizeContextType>(
  {} as LayoutSizeContextType,
)

export const useLayoutSizeContext = (): LayoutSizeContextType => {
  return React.useContext<LayoutSizeContextType>(LayoutSizeContext)
}

type Props = {
  children: React.ReactNode
}

export const LayoutSizeProvider = (props: Props) => {
  const [headerHight, setHeaderHight] = React.useState<number>(0)
  const [footerHight, setFooterHight] = React.useState<number>(0)

  const value: LayoutSizeContextType = {
    headerHight,
    setHeaderHight,
    footerHight,
    setFooterHight,
  }

  return (
    <LayoutSizeContext.Provider value={value}>
      {props.children}
    </LayoutSizeContext.Provider>
  )
}
