import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { NextHead } from '@/shared';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHead />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
export default MyApp;
