import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css';

import type { EmotionCache } from '@emotion/react'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { NextComponentType } from 'next'
import type { AppProps, AppType } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { SnackbarProvider } from 'notistack'
import { useEffect } from 'react';

import { useStore } from '@/app/stores/store';
import GaScript from '@/components/googleanalytics/gaScript'
import Layout from '@/components/layout/layout'
import { GA_MEASUREMENT_ID } from '@/constants'
import createEmotionCache from '@/createEmotionCache'
import { useGoogleAnalytics } from '@/hooks/usegoogleanalytics'
import { Providers } from '@/store/providers'

import theme from '../theme'
import { trpc } from '../utils/trpc'
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: AppType = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const {commonStore, userStore} = useStore();
  useGoogleAnalytics(GA_MEASUREMENT_ID) // Google Analyticsを使用

  // ページコンポーネントからタイトルを取得する
  const pageTitle =
    ((Component as NextComponentType & { title?: string }).title || '') +
    ' | SATRACK'

    
  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(()=> commonStore.setAppLoaded());

    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])
  
  return (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <Providers>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <SnackbarProvider
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              {/* Google Analyticsのスクリプト */}
              <GaScript GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
              <Head>
                <title>{pageTitle}</title>
              </Head>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SnackbarProvider>
          </Providers>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  )
}
export default trpc.withTRPC(MyApp)
