'use client'

import { RiChatSmile3Line, RiSendPlane2Fill } from 'react-icons/ri'
import { useState, Fragment } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useChannel } from '../context/ChannelProvider'
import { Message, User } from '../types'
import { useUser } from '../context/UserProvider'

export function Chat() {
  const [message, setMessage] = useState<string>('')
  const { messages, sentMessage, joinChannel, currChannel }: any = useChannel()
  const { loggedUser }: any = useUser()

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(target.value)
  }

  const handleClick = () => {
    if (!message.trim()) {
      return
    }

    const lastMsg = messages && messages[messages.length - 1]
    const newId = lastMsg ? lastMsg.id + 1 : 1

    sentMessage(
      {
        user: {
          name: loggedUser.name,
          id: loggedUser.id,
          avatar: loggedUser.avatar
        },
        id: newId,
        message: message
      },
      currChannel.id
    )

    joinChannel(loggedUser, currChannel.id)

    setMessage('')
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <div className='relative flex flex-col px-16 h-full w-full'>
      <div className='flex flex-col-reverse gap-6 mt-4 overflow-y-auto h-[725px]'>
        {messages
          ?.map((msg: Message, index: number) => (
            <div className='flex gap-4 mr-6' key={index}>
              {msg.user?.avatar ? (
                <img
                  src={msg.user?.avatar}
                  alt='avatar'
                  className='w-10 h-10 rounded-full'
                />
              ) : (
                <RiChatSmile3Line className='w-10 h-10 text-green-600' />
              )}
              <div className='text-sm flex flex-col max-w-7xl gap-1'>
                <p>{msg.user?.name}</p>
                <p key={index} className='leading-relaxed opacity-70'>
                  {msg.message?.split('\n').map((line: any, i: any) => (
                    <Fragment key={i}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))
          .reverse()}
      </div>
      <div className='absolute bg-[#101010] bottom-6 w-full left-0 px-16'>
        <TextareaAutosize
          maxRows={8}
          className='w-full flex items-center focus:ring-0 focus:border-none ring-0 border-none py-4 pl-6 pr-16 max-h-96 resize-none text-sm bg-zinc-800 rounded-lg outline-none duration-300'
          placeholder='Send a message'
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleClick}
          className='absolute top-1/2 -translate-y-1/2 right-16 p-2 rounded-lg h-fit flex items-center mr-3 bg-green-600'
        >
          <RiSendPlane2Fill className='w-4 h-4' />
        </button>
      </div>
    </div>
  )
}
