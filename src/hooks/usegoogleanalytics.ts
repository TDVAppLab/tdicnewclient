import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useGoogleAnalytics = (GA_MEASUREMENT_ID: string) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
