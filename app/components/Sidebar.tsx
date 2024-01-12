'use client'

import { useRef, useState, useEffect } from 'react'
import { Channel } from '../types'
import {
  RiSettings4Line,
  RiLogoutBoxLine,
  RiUser3Line,
  RiChatSmile3Line,
  RiAddFill,
  RiSearchLine
} from 'react-icons/ri'
import { Input } from './Input'
import { useUser } from '../context/UserProvider'
import { clickAwayListener } from '../helpers/clickAwayListener'
import { useChannel } from '../context/ChannelProvider'
import Link from 'next/link'

export function Sidebar({
  handleChannelForm,
  currChannel
}: {
  handleChannelForm: () => void
  currChannel: any
}) {
  const [toggle, setToggle] = useState<boolean>(false)
  const { LogOut, loggedUser: user }: any = useUser()
  const { channels, getChannels }: any = useChannel()
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const callAPI = async () => {
      if (user) {
        await getChannels(user)
      }
    }

    callAPI()
  }, [user])

  clickAwayListener(wrapperRef, setToggle)

  return (
    <aside className='flex relative flex-col justify-between bg-[#080808] h-full w-1/6 border-r border-zinc-800 rounded-l-lg'>
      <div className='flex justify-between max-h-16 items-center p-4 border-b border-zinc-800'>
        <h2>Channels</h2>
        <button
          className='bg-zinc-900 p-1 rounded hover:bg-zinc-800 duration-300'
          onClick={handleChannelForm}
        >
          <RiAddFill className='w-6 h-6' />
        </button>
      </div>
      <div className='p-4 h-full'>
        <Input placeholder='Search' icon={<RiSearchLine />} />
        <div className='flex flex-col gap-6 py-6 overflow-y-auto max-h-[700px]'>
          <p>Your Channels</p>
          {channels
            ?.filter((channel: Channel) => channel.leader?.id === user.id)
            .map((channel: Channel) => (
              <Link
                href={`/channels?name=${channel.name}&id=${channel.id}`}
                className='flex gap-2 items-center w-full group'
                key={channel.id}
              >
                {(channel.avatar && (
                  <img
                    src={channel?.avatar}
                    className='w-11 h-11 object-cover rounded-lg'
                  />
                )) || (
                  <span className='flex items-center justify-center w-11 h-11 bg-zinc-900 rounded-lg'>
                    {channel.name
                      .charAt(0)
                      .concat(
                        channel.name.substr(channel.name.indexOf(' ') + 1, 1)
                      )}
                  </span>
                )}
                <span
                  className={`${
                    currChannel?.id !== channel?.id && 'group-hover:opacity-60'
                  } duration-300 truncate ${
                    currChannel?.id === channel?.id && 'text-green-500'
                  }`}
                >
                  {channel.name}
                </span>
              </Link>
            ))}
          <p>Other Channels</p>
          {channels
            ?.filter((channel: Channel) => channel.leader?.id !== user.id)
            .map((channel: Channel) => (
              <Link
                href={`/channels?name=${channel.name}&id=${channel.id}`}
                className='flex gap-2 items-center w-full group'
                key={channel.id}
              >
                {(channel.avatar && (
                  <img
                    src={channel?.avatar}
                    className='w-11 h-11 object-cover rounded-lg'
                  />
                )) || (
                  <span className='flex items-center justify-center w-11 h-11 bg-zinc-900 rounded-lg'>
                    {channel.name
                      .charAt(0)
                      .concat(
                        channel.name.substr(channel.name.indexOf(' ') + 1, 1)
                      )}
                  </span>
                )}
                <span
                  className={`${
                    currChannel?.id !== channel?.id && 'group-hover:opacity-60'
                  } duration-300 truncate ${
                    currChannel?.id === channel?.id && 'text-green-500'
                  }`}
                >
                  {channel.name}
                </span>
              </Link>
            ))}
        </div>
      </div>
      {toggle && (
        <div
          ref={wrapperRef}
          className='flex flex-col items-start absolute bottom-20 text-sm w-44 border-y border-zinc-800 w-full shadow bg-[#131313]'
        >
          <Link href='/profile' className='flex items-center gap-2 py-4 px-2 w-full z-50 hover:bg-zinc-900 duration-300'>
            <RiUser3Line className='w-5 h-5' />
            My Profile
          </Link>
          <button
            className='flex items-center gap-2 py-4 px-2 w-full border-t z-50 border-zinc-800 text-red-500 hover:bg-zinc-900 duration-300'
            onClick={() => LogOut()}
          >
            <RiLogoutBoxLine className='w-5 h-5' />
            Log Out
          </button>
        </div>
      )}
      <div className='flex relative font-light gap-4 items-center px-4 bg-[#040404] border-t border-zinc-800 h-24 rounded-bl-lg w-full'>
        {user?.avatar ? (
          <img src={user?.avatar} alt='avatar' className='w-12 h-12 object-cover rounded-full' />
        ) : (
          <RiChatSmile3Line className='w-12 h-12 text-green-600' />
        )}
        <div>
          <p className='text-sm'>{user?.name}</p>
          <p className='opacity-80 text-xs'>@{user?.username}</p>
        </div>
        <div className='flex items-center'>
          <button
            onClick={() => setToggle(!toggle)}
            className='absolute right-4 hover:bg-zinc-900 w-10 h-10 flex items-center justify-center rounded-full duration-150'
          >
            <RiSettings4Line
              className={`w-6 h-6 duration-150 text-zinc-300 ${
                toggle && 'rotate-180'
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  )
}
