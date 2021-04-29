import React, { ComponentType } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Provider as ReduxContext } from 'react-redux';
import { MoralisProvider } from "react-moralis";
import store from '../src/store'
import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify'
import '../styles/globals.css'

const moralisAppID = process.env.NEXT_PUBLIC_MORALIS_APP_ID
const moralisServerUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: ComponentType<AppProps>
  pageProps: AppProps
}) => {
  return (
    <MoralisProvider appId={moralisAppID} serverUrl={moralisServerUrl} >
      <ReduxContext store={store}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </ThemeProvider>
      </ReduxContext>
    </MoralisProvider>
  )
}

export default MyApp
