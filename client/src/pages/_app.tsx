import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MyCartContextWrapper } from '../context/Context'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyCartContextWrapper>
      <Component {...pageProps} />
    </MyCartContextWrapper>
  )


}
