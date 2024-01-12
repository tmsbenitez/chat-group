'use client'

import { Container } from '../components/Container'
import { Chat } from '../components/Chat'
import { useEffect } from 'react'
import { useChannel } from '../context/ChannelProvider'

export default function Channel({ searchParams }: any) {
  const { getChannelById, currChannel }: any = useChannel()

  useEffect(() => {
    getChannelById(searchParams.id)
  }, [searchParams])

  return (
    <Container>
      <main className='flex relative flex-col items-center w-5/6 h-full'>
        <div className='flex p-5 border-b w-full h-16 items-center justify-between border-zinc-800'>
          <p>{currChannel?.name}</p>
        </div>
        {currChannel && <Chat />}
      </main>
    </Container>
  )
}
