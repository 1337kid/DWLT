import './globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Inter } from 'next/font/google'
import {NextAuthProvider} from './Providers'
import { Navbar, Footer } from '@/components'

config.autoAddCss = false
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DWLT',
  description: 'A digital wallet',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        <Navbar/>
          {children}
        </NextAuthProvider>
        </body>
    </html>
  )
}
