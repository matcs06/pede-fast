import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from '@next/font/google'
import SideBar from '../components/SideBar/SideBar'
import { MyUserLoginContextWrapper } from '../context/Context'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700',]

})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyUserLoginContextWrapper>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </MyUserLoginContextWrapper>

  );
}
