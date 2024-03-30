import type { Satellite } from '@prisma/client'
import React from 'react'

import { trpc } from '@/utils/trpc'

export type TleContextType = {
  targetTleString: Satellite | undefined
  setTargetTleString: (headerHight: Satellite) => void
  tleStrings: Satellite[]
  isLoading: boolean
}
const TleContext = React.createContext<TleContextType>({} as TleContextType)

export const useTleContext = (): TleContextType => {
  return React.useContext<TleContextType>(TleContext)
}

type Props = {
  children: React.ReactNode
}

export const TleProvider = (props: Props) => {
  const [targetTleString, setTargetTleString] = React.useState<Satellite>()

  const ttle = trpc.tleRouter.getTleString.useQuery()

  const tles = trpc.tleRouter.getTleStringAll.useQuery()

  const value: TleContextType = {
    targetTleString: ttle.data ?? undefined,
    setTargetTleString: setTargetTleString,
    tleStrings: tles.data ?? [],
    isLoading: tles.isLoading,
  }

  return (
    <TleContext.Provider value={value}>{props.children}</TleContext.Provider>
  )
}
