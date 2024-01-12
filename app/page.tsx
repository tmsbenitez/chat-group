'use client'

import { Container } from './components/Container'
import { Chat } from './components/Chat'
import { RiChatSmile3Line } from 'react-icons/ri'
import { useChannel } from './context/ChannelProvider'

export default function Home() {
  const { currChannel }: any = useChannel()

  return (
    <Container>
      <main className='flex relative flex-col items-center w-5/6 h-full'>
        {!currChannel && (
          <RiChatSmile3Line className='absolute top-1/2 -translate-y-1/2 text-green-600/10 w-96 h-96' />
        )}
      </main>
    </Container>
  )
}
