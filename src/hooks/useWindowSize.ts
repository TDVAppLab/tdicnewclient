/**
 * リサイズに合わせて画面サイズを取得するHook。
 * https://zenn.dev/developanda/articles/daf34873fe4ef4
 * Example
 * const { width, height } = useWindowSize();
 */

import { useEffect, useState } from "react"

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener("resize", handleResize)
      handleResize()
      return () => window.removeEventListener("resize", handleResize)
    } else {
      return
    }
  }, [])
  return windowSize
}
