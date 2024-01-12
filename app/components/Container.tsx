'use client'

import { useState, useRef } from 'react'
import ChannelForm from '../components/Form/ChannelForm'
import { clickAwayListener } from '../helpers/clickAwayListener'
import { Children } from '../types'
import { Sidebar } from './Sidebar'
import { useChannel } from '../context/ChannelProvider'

export function Container({ children }: Children) {
  const { currChannel }: any = useChannel()
  const [showChannelForm, setShowChannelForm] = useState<boolean>(false)
  const channelFormRef = useRef<HTMLDivElement | null>(null)

  const handleChannelForm = () => {
    setShowChannelForm(!showChannelForm)
  }

  clickAwayListener(channelFormRef, setShowChannelForm)

  return (
    <main className='w-full p-6 flex items-center h-screen'>
      <section className='hidden md:flex relative items-center justify-between border border-zinc-800 bg-[#101010] h-[95vh] rounded-lg w-full'>
        <Sidebar
          handleChannelForm={handleChannelForm}
          currChannel={currChannel}
        />
        <div className='flex relative flex-col items-center w-5/6 h-full'>
          {children}
        </div>
        {showChannelForm && (
          <div
            ref={channelFormRef}
            className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50'
          >
            <ChannelForm setShowChannelForm={setShowChannelForm} />
          </div>
        )}
        {showChannelForm && (
          <div className='absolute w-full h-full bg-black/60 rounded-lg' />
        )}
      </section>

      <section className='flex md:hidden'>
        <p className='text-xl absolute left-1/2 -translate-x-1/2 w-full text-center px-6'>
          Currently not available mobile version
        </p>
      </section>
    </main>
  )
}
