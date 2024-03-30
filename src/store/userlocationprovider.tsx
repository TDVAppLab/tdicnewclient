import React, { useEffect } from 'react'

export type UserLocationContextType = {
  userLatitude: number
  setUserLatitude: (headerHight: number) => void
  userLongitude: number
  setUserLongitude: (footerHight: number) => void
}
const UserLocationContext = React.createContext<UserLocationContextType>(
  {} as UserLocationContextType,
)

export const useUserLocationContext = (): UserLocationContextType => {
  return React.useContext<UserLocationContextType>(UserLocationContext)
}

type Props = {
  children: React.ReactNode
}

export const UserLocationProvider = (props: Props) => {
  const [userLatitude, setUserLatitude] = React.useState<number>(0)
  const [userLongitude, setUserLongitude] = React.useState<number>(0)

  useEffect(() => {
    // navigator オブジェクトへのアクセスは、このブロック内で行います。
    // これにより、コードがクライアントサイドでのみ実行されることが保証されます。
    if ('geolocation' in navigator) {
      // Geolocation APIが利用可能
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setUserLatitude(position.coords.latitude)
          setUserLongitude(position.coords.longitude)
        },
        function (error) {
          // 現在の位置情報取得に失敗した場合の処理
          console.error('Error Code = ' + error.code + ' - ' + error.message)
        },
      )
    } else {
      // Geolocation APIが利用不可
      console.error('Geolocation is not supported by this browser.')
    }
  }, [])

  const value: UserLocationContextType = {
    userLatitude,
    setUserLatitude,
    userLongitude,
    setUserLongitude,
  }

  return (
    <UserLocationContext.Provider value={value}>
      {props.children}
    </UserLocationContext.Provider>
  )
}
