import './globals.css'
import UserProvider from './context/UserProvider'
import ChannelProvider from './context/ChannelProvider'
import { Fira_Sans } from 'next/font/google'
import { Children } from './types'

const fira = Fira_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata = {
  title: 'Glow',
  description: 'Generated by create next app'
}

export default function RootLayout({ children }: Children) {
  return (
    <html lang='en'>
      <body className={fira.className}>
        <UserProvider>
          <ChannelProvider>{children}</ChannelProvider>
        </UserProvider>
      </body>
    </html>
  )
}